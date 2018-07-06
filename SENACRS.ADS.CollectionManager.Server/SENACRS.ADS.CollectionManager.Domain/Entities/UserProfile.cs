using SENACRS.ADS.CollectionManager.Domain.Contracts.Entity;
using System;
using System.Collections.Generic;

namespace SENACRS.ADS.CollectionManager.Domain.Entities
{
  public  class UserProfile : IEntity
    {
        public string Login { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public double CurrentLatitude { get; set; }
        public double CurrentLongitude { get; set; }
        public double Distance { get; set; }
    }
}
