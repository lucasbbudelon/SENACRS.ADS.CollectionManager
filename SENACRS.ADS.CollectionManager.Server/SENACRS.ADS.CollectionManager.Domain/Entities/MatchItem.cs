using SENACRS.ADS.CollectionManager.Domain.Contracts.Entity;
using System;
using System.Collections.Generic;

namespace SENACRS.ADS.CollectionManager.Domain.Entities
{
   public class MatchItem : IEntity
    {
        public Collection Collection { get; set; }
        public CollectionItem CollectionItem { get; set; }
        public UserProfile UserProfileChange { get; set; }
        public UserProfile UserProfileNeed { get; set; }
    }
}
