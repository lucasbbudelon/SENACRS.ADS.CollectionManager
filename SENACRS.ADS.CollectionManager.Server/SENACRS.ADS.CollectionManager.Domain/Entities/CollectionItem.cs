using SENACRS.ADS.CollectionManager.Domain.Contracts.Entity;
using System;

namespace SENACRS.ADS.CollectionManager.Domain.Entities
{
    public class CollectionItem : IEntity
    {
        public Guid Id { get; set; }
        public string Number { get; set; }
        public int Quantity { get; set; }
        public bool IsRare { get; set; }
    }
}
