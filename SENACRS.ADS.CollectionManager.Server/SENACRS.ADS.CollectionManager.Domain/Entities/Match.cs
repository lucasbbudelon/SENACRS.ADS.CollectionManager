using SENACRS.ADS.CollectionManager.Domain.Contracts.Entity;
using System;
using System.Collections.Generic;

namespace SENACRS.ADS.CollectionManager.Domain.Entities
{
   public class Match : IEntity
    {
        public UserProfile UserProfile { get; set; }
        public Group Group { get; set; }
        public List<MatchItem> ItemsNeed { get; set; }
        public List<MatchItem> ItemsChange { get; set; }
    }
}
