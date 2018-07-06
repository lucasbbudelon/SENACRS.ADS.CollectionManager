using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SENACRS.ADS.CollectionManager.Domain.Entities;

namespace SENACRS.ADS.CollectionManager.WebApi.Controllers
{
    [Produces("application/json")]
    public class AlbumController : Controller
    {
        static public List<Album> _list;

        public AlbumController()
        {
            if (_list == null)
            {
                _list = new List<Album>
                {
                    GetAlbum("FWC18", "lucasbbudelon"),
                    GetAlbum("FWC18", "lady"),

                    GetAlbum("TLK94", "lucasbbudelon"),
                    GetAlbum("TLK94", "veri"),

                    GetAlbum("PKM99", "lucasbbudelon"),
                    GetAlbum("PKM99", "veri"),
                    GetAlbum("PKM99", "lady"),
                    GetAlbum("PKM99", "isadora")
                };
            }
        }

        [HttpGet]
        [Route("api/Album")]
        public Album Get(Guid id)
        {
            return _list.FirstOrDefault(x => x.Id.Equals(id));
        }

        [HttpGet]
        [Route("api/Album/GetByLogin")]
        public List<Album> GetByLogin(string login)
        {
            return _list.Where(x => x.UserProfile.Login.Equals(login)).ToList();
        }

        [HttpGet]
        [Route("api/Album/GetByCollection")]
        public List<Album> GetByCollection(string codeCollection)
        {
            return _list.Where(x => x.Collection.Code.Equals(codeCollection)).ToList();
        }

        [HttpGet]
        [Route("api/Album/Match")]
        public List<Match> Match(Guid albumId)
        {
            List<Match> list = new List<Match>();

            //Carrega album
            Album album = Get(albumId);

            //Grupos que o login participa e estão vinculados a coleção do album
            var groups = new GroupController().GetByLogin(album.UserProfile.Login).Where(g => g.Collection.Code.Equals(album.Collection.Code));

            foreach (var group in groups)
            {
                var groupMatch = new Match()
                {
                    Group = group,
                    UserProfile = album.UserProfile,
                    ItemsChange = new List<MatchItem>(),
                    ItemsNeed = new List<MatchItem>()
                };

                //Albums vinculados a coleção
                var albumsByCollection = GetByCollection(group.Collection.Code).Where(a => a.Id != album.Id);

                foreach (var albumByCollection in albumsByCollection)
                {
                    var itemsNeed = album.MissingItems.Select(i => i.Id).Intersect(albumByCollection.RepeatItems.Select(i => i.Id));
                    foreach (var guide in itemsNeed)
                    {
                        groupMatch.ItemsNeed.Add(new MatchItem()
                        {
                            Collection = albumByCollection.Collection,
                            CollectionItem = album.Items.FirstOrDefault(i => i.Id.Equals(guide)),
                            UserProfileChange = albumByCollection.UserProfile,
                            UserProfileNeed = album.UserProfile
                        });
                    }

                    var itemsChange = album.RepeatItems.Select(i => i.Id).Intersect(albumByCollection.MissingItems.Select(i => i.Id));
                    foreach (var guide in itemsChange)
                    {
                        groupMatch.ItemsChange.Add(new MatchItem()
                        {
                            Collection = albumByCollection.Collection,
                            CollectionItem = album.Items.FirstOrDefault(i => i.Id.Equals(guide)),
                            UserProfileNeed = albumByCollection.UserProfile,
                            UserProfileChange = album.UserProfile
                        });
                    }
                }

                list.Add(groupMatch);
            }

            return list;
        }

        [HttpGet]
        [Route("api/Album/MatchByProximity")]
        public List<Match> MatchByProximity(Guid albumId, int distance)
        {
            List<Match> list = new List<Match>();

            //Carrega album
            Album album = Get(albumId);

            //Albums que pertencem a mesma coleção e usuários estão próximos
            var albums = _list.Where(a => 
                a.Collection.Code.Equals(album.Collection.Code) && 
                a.UserProfile.Distance - album.UserProfile.Distance <= distance);

            foreach (var albumByCollection in albums)
            {
                var match = new Match()
                {
                    UserProfile = album.UserProfile,
                    ItemsChange = new List<MatchItem>(),
                    ItemsNeed = new List<MatchItem>()
                };

                var itemsNeed = album.MissingItems.Select(i => i.Id).Intersect(albumByCollection.RepeatItems.Select(i => i.Id));
                foreach (var guide in itemsNeed)
                {
                    match.ItemsNeed.Add(new MatchItem()
                    {
                        Collection = albumByCollection.Collection,
                        CollectionItem = album.Items.FirstOrDefault(i => i.Id.Equals(guide)),
                        UserProfileChange = albumByCollection.UserProfile,
                        UserProfileNeed = album.UserProfile
                    });
                }

                var itemsChange = album.RepeatItems.Select(i => i.Id).Intersect(albumByCollection.MissingItems.Select(i => i.Id));
                foreach (var guide in itemsChange)
                {
                    match.ItemsChange.Add(new MatchItem()
                    {
                        Collection = albumByCollection.Collection,
                        CollectionItem = album.Items.FirstOrDefault(i => i.Id.Equals(guide)),
                        UserProfileNeed = albumByCollection.UserProfile,
                        UserProfileChange = album.UserProfile
                    });
                }


                list.Add(match);
            }

            return list;
        }

        [HttpGet]
        [Route("api/Album/Exchange")]
        public bool Exchange(string fromUserProfileLogin, string toUserProfileLogin, string collectionCode, Guid collectionItemId)
        {
            var sourceAlbum = _list.FirstOrDefault(a => a.UserProfile.Login.Equals(fromUserProfileLogin) && a.Collection.Code.Equals(collectionCode));
            var sourceItem = sourceAlbum.Items.FirstOrDefault(i => i.Id.Equals(collectionItemId));
            sourceItem.Quantity--;

            var destinationAlbum = _list.FirstOrDefault(a => a.UserProfile.Login.Equals(toUserProfileLogin) && a.Collection.Code.Equals(collectionCode));
            var destinationItem = destinationAlbum.Items.FirstOrDefault(i => i.Id.Equals(collectionItemId));
            destinationItem.Quantity++;

            return true;
        }

        //// POST: api/Default
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT: api/Default/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        #region PRIVATE

        private Album GetAlbum(string codeCollection, string userProfileLogin)
        {
            var collection = new CollectionController().Get(codeCollection);
            var userProfile = new UserProfileController().GetByLogin(userProfileLogin);

            return new Album()
            {
                Id = Guid.NewGuid(),
                Collection = collection,
                UserProfile = userProfile,
                Items = GetItems(collection)
            };
        }

        private List<CollectionItem> GetItems(Collection collection)
        {
            List<CollectionItem> items = new List<CollectionItem>();

            var random = new Random();
            var maxRepeatItems = random.Next(1, collection.Items.Count / 3);

            foreach (var item in collection.Items)
            {
                items.Add(new CollectionItem()
                {
                    Id = item.Id,
                    IsRare = item.IsRare,
                    Number = item.Number,
                    Quantity = random.Next(0, 5)
                });
            }

            return items;
        }

        #endregion
    }
}
