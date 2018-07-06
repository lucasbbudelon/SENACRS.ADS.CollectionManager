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
    public class GroupController : Controller
    {
        static public List<Group> _list;

        public GroupController()
        {
            CollectionController collectionController = new CollectionController();
            UserProfileController userProfileController = new UserProfileController();

            if (_list == null)
            {
                _list = new List<Group>
                {
                    new Group()
                    {
                        Id = Guid.NewGuid(),
                        Name = "Família",
                        Collection = collectionController.Get("PKM99"),
                        Participants = userProfileController.Get()

                    },

                    new Group()
                    {
                        Id = Guid.NewGuid(),
                        Name = "Trabalho",
                        Collection = collectionController.Get("FWC18"),
                        Participants = userProfileController.Get().Where(x=>x.Login.Equals("lucasbbudelon") || x.Login.Equals("lady")).ToList()

                    },

                    new Group()
                    {
                        Id = Guid.NewGuid(),
                        Name = "Faculdade",
                        Collection = collectionController.Get("TLK94"),
                        Participants = userProfileController.Get().Where(x=>x.Login.Equals("lucasbbudelon") || x.Login.Equals("veri")).ToList()

                    }
                };
            }
        }

        [HttpGet]
        [Route("api/Group")]
        public List<Group> Get()
        {
            return _list;
        }

        [HttpGet]
        [Route("api/Group/GetByLogin")]
        public List<Group> GetByLogin(string login)
        {
            return _list
                    .Where(g => g.Participants
                    .Any(p => p.Login.Equals(login)))
                    .ToList();
        }

        [HttpGet]
        [Route("api/Group/GetByGuide")]
        public Group Get(Guid guide)
        {
            return _list.FirstOrDefault(x => x.Id.Equals(guide));
        }
    }
}
