﻿// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using SmartLink.Entity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartLink.Service
{
    public interface IRecentFileService
    {
        Task<IEnumerable<SourceCatalog>> GetRecentFiles();
        Task<IEnumerable<SourceCatalog>> AddRecentFile(SourceCatalog sourceCatalog);
    }
}
