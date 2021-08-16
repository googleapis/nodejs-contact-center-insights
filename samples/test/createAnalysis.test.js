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
const transcriptUri = 'gs://cloud-samples-data/ccai/chat_sample.json';
const audioUri = 'gs://cloud-samples-data/ccai/voice_6912.txt';

describe('CreateAnalysis', () => {
  let projectId;

  before(async () => {
    projectId = await client.getProjectId();
  });

  it('should create a conversation and an analysis then delete both', async () => {
    const stdoutCreateConversation = execSync(
      `node ./createConversation.js ${projectId} ${transcriptUri} ${audioUri}`
    );
    const conversationName = stdoutCreateConversation.slice(8);
    assert.match(
      stdoutCreateConversation,
      new RegExp(
        'Created projects/[0-9]+/locations/us-central1/conversations/[0-9]+'
      )
    );

    const stdoutCreateAnalysis = execSync(
      `node ./createAnalysis.js ${conversationName}`
    );
    const analysisName = stdoutCreateAnalysis.slice(8);
    assert.match(
      stdoutCreateAnalysis,
      new RegExp(
        'Created projects/[0-9]+/locations/us-central1/conversations/[0-9]+/analyses/[0-9]+'
      )
    );

    const stdoutDeleteAnalysis = execSync(
      `node ./deleteAnalysis.js ${analysisName}`
    );
    assert.match(
      stdoutDeleteAnalysis,
      new RegExp(
        'Deleted projects/[0-9]+/locations/us-central1/conversations/[0-9]+/analyses/[0-9]+'
      )
    );

    const stdoutDeleteConversation = execSync(
      `node ./deleteConversation.js ${conversationName}`
    );
    assert.match(
      stdoutDeleteConversation,
      new RegExp(
        'Deleted projects/[0-9]+/locations/us-central1/conversations/[0-9]+'
      )
    );
  });
});
