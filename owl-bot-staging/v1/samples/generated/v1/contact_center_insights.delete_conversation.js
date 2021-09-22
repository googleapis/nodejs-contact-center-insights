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

function main(name) {
  // [START contactcenterinsights_delete_conversation_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The name of the conversation to delete.
   */
  // const name = 'abc123'
  /**
   *  If set to true, all of this conversation's analyses will also be deleted.
   *  Otherwise, the request will only succeed if the conversation has no
   *  analyses.
   */
  // const force = true

  // Imports the Contactcenterinsights library
  const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights').v1;

  // Instantiates a client
  const contactcenterinsightsClient = new ContactCenterInsightsClient();

  async function deleteConversation() {
    // Construct request
    const request = {
      name,
    };

    // Run request
    const response = await contactcenterinsightsClient.deleteConversation(request);
    console.log(response);
  }

  deleteConversation();
  // [END contactcenterinsights_delete_conversation_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
