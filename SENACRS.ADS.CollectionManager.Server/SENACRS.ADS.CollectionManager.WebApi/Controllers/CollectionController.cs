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
    public class CollectionController : Controller
    {
        static private List<Collection> _list;

        public CollectionController()
        {
            if (_list == null)
            {
                _list = new List<Collection>
                {
                    new Collection()
                    {
                        Code = "FWC18",
                        Name = "FIFA WORLD CUP - RUSSIA 2018",
                        Image = "https://www.soccerandrugby.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/wcstickerbook2018.jpg",
                        Company = "PANINI",
                        Year = 2018,
                        Items = GetItems(682)
                    },

                    new Collection()
                    {
                        Code = "PKM99",
                        Name = "Pokémon - Temos que pegar",
                        Image = "https://http2.mlstatic.com/figurinhas-album-pokemon-temos-que-pegar-D_NQ_NP_844986-MLB26841287729_022018-F.jpg",
                        Company = "PANINI",
                        Year = 1999,
                        Items = GetItems(64)
                    },

                    new Collection()
                    {
                        Code = "TLK94",
                        Name = "O Rei Leão",
                        Image = "https://http2.mlstatic.com/album-digitalizado-ping-pong-o-rei-leo-1994-D_NQ_NP_832550-MLB27024246841_032018-F.jpg",
                        Company = "Ping Pong",
                        Year = 1994,
                        Items = GetItems(100)
                    }
                };
            }
        }

        [HttpGet]
        [Route("api/Collection")]
        public List<Collection> Get()
        {
            return _list;
        }

        [HttpGet("{code}")]
        [Route("api/Collection")]
        public Collection Get(string code)
        {
            return _list.FirstOrDefault(x => x.Code.Equals(code));
        }

        #region PRIVATE

        private List<int> GetListRareItemsRandomized(int quantityItems, int maximumValue)
        {
            var list = new List<int>();

            var random = new Random();

            for (int i = 0; i < quantityItems; i++)
            {
                list.Add(random.Next(0, maximumValue));
            }

            return list;
        }

        private List<CollectionItem> GetItems(int totalItems)
        {
            List<CollectionItem> items = new List<CollectionItem>();
            List<int> listRareItemsRandomized = GetListRareItemsRandomized(totalItems / 5, totalItems);

            for (int i = 1; i <= totalItems; i++)
            {
                items.Add(new CollectionItem()
                {
                    Id = Guid.NewGuid(),
                    Number = i.ToString().PadLeft(4, '0'),
                    IsRare = listRareItemsRandomized.Contains(i)
                });
            }

            return items;
        }

        #endregion
    }
}
