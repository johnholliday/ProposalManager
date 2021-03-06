﻿using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace ApplicationCore.Entities
{
    public class Template : BaseEntity<Template>
    {

        [JsonProperty("templateName", Order = 2)]
        public string TemplateName { get; set; }
        [JsonProperty("description", Order = 3)]
        public string Description { get; set; }
        [JsonProperty("lastUsed", Order = 4)]
        public DateTimeOffset LastUsed { get; set; }
        [JsonProperty("createdBy", Order = 5)]
        public UserProfile CreatedBy { get; set; }
        [JsonProperty("processList", Order = 6)]
        public IList<Process> ProcessList { get; set; }
        public static Template Empty
        {
            get => new Template
            {
                Id = String.Empty,
                TemplateName = string.Empty,
                Description = string.Empty,
                LastUsed = new DateTimeOffset(),
                CreatedBy = new UserProfile(),
                ProcessList = new List<Process>()
            };
        }
    }
}
