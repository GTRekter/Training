import http from 'k6/http';
import { check } from 'k6';

import { jUnit, textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export const options = {
  stages: [
    { duration: '10s', target: 15 },
    { duration: '20s', target: 15 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<250'],
  },
};
export default function () {
  let res = http.get(`${__ENV.API_BASEURL}/HealthCheck`);
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}
export function handleSummary(data) {
  let filepath = `./${__ENV.TESTRESULT_FILENAME}-result.xml`;
    return {
        'stdout': textSummary(data, { indent: ' ', enableColors: true}), 
        './loadtest-results.xml': jUnit(data), 
    }
}