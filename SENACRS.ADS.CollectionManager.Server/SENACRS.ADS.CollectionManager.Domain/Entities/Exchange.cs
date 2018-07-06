using SENACRS.ADS.CollectionManager.Domain.Contracts.Entity;
using System;
using System.Collections.Generic;

namespace SENACRS.ADS.CollectionManager.Domain.Entities
{
    public class Exchange : IEntity
    {
        public string FromUserProfileLogin { get; set; }
        public string ToUserProfileLogin { get; set; }
        public string CollectionCode { get; set; }
        public Guid CollectionItemId { get; set; }
    }
}
