using SENACRS.ADS.CollectionManager.Domain.Contracts.Entity;
using System;
using System.Collections.Generic;

namespace SENACRS.ADS.CollectionManager.Domain.Entities
{
    public class Collection : IEntity
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Company { get; set; }
        public int Year { get; set; }
        public List<CollectionItem> Items { get; set; }
    }
}
