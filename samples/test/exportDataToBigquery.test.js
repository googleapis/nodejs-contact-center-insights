// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

'use strict';

const {assert} = require('chai');
const {before, describe, it} = require('mocha');
const cp = require('child_process');
const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const {
  ContactCenterInsightsClient,
} = require('@google-cloud/contact-center-insights');
const client = new ContactCenterInsightsClient();

describe('ExportInsightsData', () => {
  let projectId;
  let bigqueryProjectId;
  let bigqueryDataset;
  let bigqueryTable;

  before(async () => {
    projectId = await client.getProjectId();
    bigqueryProjectId = await client.getProjectId();
    bigqueryDataset = 'my_bigquery_dataset';
    bigqueryTable = 'my_bigquery_table';
  });

  it('should export data to BigQuery', async () => {
    const stdout = execSync(`node ./exportDataToBigquery.js \
                             ${projectId} ${bigqueryProjectId} ${bigqueryDataset} ${bigqueryTable}`);
    assert.match(stdout, new RegExp('Exported data to BigQuery'));
  });
});
