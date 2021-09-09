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

function main(projectId) {
  // [START contactcenterinsights_set_project_ttl]
  /**
   * TODO(developer): Uncomment this variable before running the sample.
   */
  // const projectId = 'my_project_id';

  // Imports the Contact Center Insights client.
  const {
    ContactCenterInsightsClient,
  } = require('@google-cloud/contact-center-insights');

  // Instantiates a client.
  const client = new ContactCenterInsightsClient();

  async function setProjectTtl() {
    await client.updateSettings({
      settings: {
        name: client.settingsPath(projectId, 'us-central1'),
        conversationTtl: {
          seconds: 60,
        },
      },
      updateMask: {
        paths: ['conversation_ttl'],
      },
    });
    console.info('Set TTL for all incoming conversations to 60 seconds.');
  }
  setProjectTtl();
  // [END contactcenterinsights_set_project_ttl]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
