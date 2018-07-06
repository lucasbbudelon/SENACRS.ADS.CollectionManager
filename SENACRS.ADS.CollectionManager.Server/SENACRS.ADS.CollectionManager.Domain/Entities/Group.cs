using SENACRS.ADS.CollectionManager.Domain.Contracts.Entity;
using System;
using System.Collections.Generic;

namespace SENACRS.ADS.CollectionManager.Domain.Entities
{
   public class Group : IEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Collection Collection { get; set; }
        public List<UserProfile> Participants { get; set; }
    }
}
