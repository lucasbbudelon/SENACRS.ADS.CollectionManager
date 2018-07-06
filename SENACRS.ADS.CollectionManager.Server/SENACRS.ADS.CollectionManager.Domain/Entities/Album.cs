using SENACRS.ADS.CollectionManager.Domain.Contracts.Entity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SENACRS.ADS.CollectionManager.Domain.Entities
{
    public class Album : IEntity
    {
        public Guid Id { get; set; }
        public Collection Collection { get; set; }
        public UserProfile UserProfile { get; set; }
        public List<CollectionItem> Items { get; set; }
        public List<CollectionItem> MissingItems
        {
            get
            {
                return Items.Where(x => x.Quantity == 0).ToList();
            }
        }
        public List<CollectionItem> SingleItems
        {
            get
            {
                return Items.Where(x => x.Quantity == 1).ToList();
            }
        }
        public List<CollectionItem> RepeatItems
        {
            get
            {
                return Items.Where(x => x.Quantity > 1).ToList();
            }
        }
        public List<CollectionItem> RareItems
        {
            get
            {
                return Items.Where(x => x.IsRare).ToList();
            }
        }
        public int TotalItems
        {
            get
            {
                return Items.Where(i => i.Quantity > 0).ToList().Count;
            }
        }
    }
}
