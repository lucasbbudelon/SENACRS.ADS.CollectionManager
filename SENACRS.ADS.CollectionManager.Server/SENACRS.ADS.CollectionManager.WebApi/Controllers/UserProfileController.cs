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
    public class UserProfileController : Controller
    {
        static public List<UserProfile> _list;

        public UserProfileController()
        {
            CollectionController collectionController = new CollectionController();

            if (_list == null)
            {
                _list = new List<UserProfile>
                {
                    new UserProfile()
                    {
                        Login = "lucasbbudelon",
                        Name = "Lucas B Budelon",
                        Image = "https://scontent-gru2-1.xx.fbcdn.net/v/t1.0-9/20882022_1857936974421309_4943349701368875289_n.jpg?_nc_cat=0&_nc_eui2=AeHpeiUShw7uOQJkJYKzhKzZaBBEHxqb05cMXQoJQdHyDCegedLv8nOu-myudtl_6XJeYlfiFnkZNdnLnUcLZC2GSIwkdUCJvLbgMP-cCamplg&oh=1d6ffc310b03a47d0d75fc218fd48aac&oe=5BA7E35F",
                        CurrentLatitude = -31.997976f,
                        CurrentLongitude = 115.762877f,
                        Distance = 100
                    },

                    new UserProfile()
                    {
                        Login = "veri",
                        Name = "Veridiana Hass Teixeira Budelon",
                        Image = "https://scontent-gru2-1.xx.fbcdn.net/v/t1.0-9/16105855_1198089420266885_6544586671787053965_n.jpg?_nc_cat=0&_nc_eui2=AeHpIL7mgj8dyqFFF2yVgZ8hNjdLP2n9vS3Iol7hXHatUjB3s4UdZBY67a9O51uDO0BKnc7B6NldHumzpUctn5xodamLFLjuwG338jnWuZKKqg&oh=dc1e9bb6fa96959be5032a6b3ea298bd&oe=5BE8DAD9",
                        CurrentLatitude = -31.99212f,
                        CurrentLongitude = 115.763228f,
                        Distance = 50
                    },

                    new UserProfile()
                    {
                        Login = "lady",
                        Name = "Lady",
                        Image = "https://scontent-gru2-1.xx.fbcdn.net/v/t1.0-9/35156818_1701020169973805_6532166140729229312_n.jpg?_nc_cat=0&_nc_eui2=AeFC-K0_bBEcSUlxpeY52_TaDpQEY43uXIONX3mhwIJxO9cbQHF7hzmwKnavQpjlCSJ2vYre3Km6Ji7nZnFjMR4de4kRLQT-pR6SyctHLvcafg&oh=2ff11f440b23c36e8d74dd54c508cea7&oe=5BB12194",
                        CurrentLatitude = -31.997976f,
                        CurrentLongitude = 115.762877f,
                        Distance = 70
                    },

                    new UserProfile()
                    {
                        Login = "isadora",
                        Name = "Isadora",
                        Image = "https://lh3.googleusercontent.com/R81VYxlniMxuzCg1gvJmCN8RXKwac9JL4ycQDpBGbnakN2rMzmnLsZ14ED03znr4hPiGvBxzxMq9a9-Khw8s0jywzPf1KZ8c14sNEIK8pPjW_-sfiewHRIk6qYkgJaucQb-pxgZP2u3kDcRToQaRDdfVJbKNidc0a0OgdRUHOtAgDZ7xIuEMg40Ato_lOz3xzGoGfDEcqIX7vViuZHVdZlJrSbHtPGdxv1yh2M30I-5USqOwjXfd5vaBCh2uLa5YTOYvWbk3vlV3_FGVEP7uZjDg1RHBhGYAr4K46ySYv1puTE-WJI-dc3_y-VmeL3Nm0idaE_2-T4qrglJ7K0LZAwxFGZYosh_l9WkaVvTHVLzQXuZ561cP-2QhtsvA_CDStlc6V5tBgghdVt4zPyWVhGqtErxFJmBN-cxQOqC-UR5NZGbj0wmk8wPevNENEv1XRtEH8xXa4tl4E8YCJNQhYUYN0tkYQ3XyL2x9TI5XQ1DZ0hhLQr8okDFJJw8rNUKdkWu6QkGCyOlUBPEoTz1184kY-D_NJ8zIYiaDnciVpr050aOLT3Azo82uAuiC-05dclWX2ICcU-z9tqAj0cfLzRvlYWkkNbRbIxTyO1dT=w478-h635-no",
                        CurrentLatitude = -31.99212f,
                        CurrentLongitude = 115.763228f,
                        Distance = 97
                    }
                };
            }
        }

        [HttpGet]
        [Route("api/UserProfile")]
        public List<UserProfile> Get()
        {
            return _list;
        }

        [HttpGet("{login}")]
        [Route("api/UserProfile/GetByLogin")]
        public UserProfile GetByLogin(string login)
        {
            return _list.FirstOrDefault(x => x.Login.Equals(login));
        }

        [HttpGet]
        [Route("api/UserProfile/GetNearest")]
        public List<UserProfile> GetNearest(string login, int proximity)
        {
            var userProfile = GetByLogin(login);

            return _list.Where(x =>
                Calculate(x.CurrentLatitude, x.CurrentLongitude, userProfile.CurrentLatitude, userProfile.CurrentLongitude) <= proximity)
                .ToList();
        }

        private double Calculate(double latitude1, double longitude1, double latitude2, double longitude2)
        {
            var radiansOverDegrees = (Math.PI / 180.0);

            var sLatitudeRadians = latitude1 * radiansOverDegrees;
            var sLongitudeRadians = longitude1 * radiansOverDegrees;
            var eLatitudeRadians = latitude2 * radiansOverDegrees;
            var eLongitudeRadians = longitude2 * radiansOverDegrees;

            var dLongitude = eLongitudeRadians - sLongitudeRadians;
            var dLatitude = eLatitudeRadians - sLatitudeRadians;

            var result1 = Math.Pow(Math.Sin(dLatitude / 2.0), 2.0) +
                          Math.Cos(sLatitudeRadians) * Math.Cos(eLatitudeRadians) *
                          Math.Pow(Math.Sin(dLongitude / 2.0), 2.0);

            // Using 3956 as the number of miles around the earth
            var result2 = 3956.0 * 2.0 *
                          Math.Atan2(Math.Sqrt(result1), Math.Sqrt(1.0 - result1));

            return result2;
        }
    }
}
