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

function main(projectId, bigqueryProjectId, bigqueryDataset, bigqueryTable) {
  // [START contactcenterinsights_export_data_to_bigquery]
  /**
    * TODO(developer): Uncomment these variables before running the sample.
    */
  // const projectId = 'my_project_id';
  // const bigqueryProjectId = 'my_bigquery_project_id';
  // const bigqueryDataset = 'my_bigquery_dataset';
  // const bigqueryTable = 'my_bigquery_table';

  // Imports the Contact Center Insights client.
  const {
    ContactCenterInsightsClient,
  } = require('@google-cloud/contact-center-insights');

  // Instantiates a client.
  const client = new ContactCenterInsightsClient();

  async function exportDataToBigquery() {
    const [operation] = await client.exportInsightsData({
      parent: client.locationPath(projectId, 'us-central1'),
      bigQueryDestination: {
        projectId: bigqueryProjectId,
        dataset: bigqueryDataset,
        table: bigqueryTable,
      },
    });

    // Wait for operation to complete.
    try {
      await operation.promise();
    } catch (e) {
      if (e.message == 'Long running operation has finished but there was no result') {
        // Ignore because the export operation doesn't return a response when it completes.
      } else {
        throw e;
      }
    }
    console.info('Exported data to BigQuery');
  }
  exportDataToBigquery();
  // [END contactcenterinsights_export_data_to_bigquery]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
