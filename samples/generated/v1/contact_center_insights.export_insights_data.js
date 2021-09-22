// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

function main(parent) {
  // [START contactcenterinsights_export_insights_data_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Specified if sink is a BigQuery table.
   */
  // const bigQueryDestination = ''
  /**
   *  Required. The parent resource to export data from.
   */
  // const parent = 'abc123'
  /**
   *  A filter to reduce results to a specific subset. Useful for exporting
   *  conversations with specific properties.
   */
  // const filter = 'abc123'
  /**
   *  A fully qualified KMS key name for BigQuery tables protected by CMEK.
   *  Format:
   *  projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{key}/cryptoKeyVersions/{version}
   */
  // const kmsKey = 'abc123'

  // Imports the Contactcenterinsights library
  const {ContactCenterInsightsClient} =
    require('@google-cloud/contact-center-insights').v1;

  // Instantiates a client
  const contactcenterinsightsClient = new ContactCenterInsightsClient();

  async function exportInsightsData() {
    // Construct request
    const request = {
      parent,
    };

    // Run request
    const [operation] = await contactcenterinsightsClient.exportInsightsData(
      request
    );
    const [response] = await operation.promise();
    console.log(response);
  }

  exportInsightsData();
  // [END contactcenterinsights_export_insights_data_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
