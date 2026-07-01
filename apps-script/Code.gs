/**
 * IEUM Fake Door — Google Apps Script
 *
 * 배포 방법:
 * 1. Google Sheets에서 [확장 프로그램] → [Apps Script] 열기
 * 2. 이 코드 붙여넣기
 * 3. [배포] → [새 배포] → 유형: 웹 앱
 *    - 액세스 권한: 모든 사용자
 *    - 다음 사용자로 실행: 나
 * 4. 배포 URL을 복사해서 App.js의 APPS_SCRIPT_URL에 입력
 *
 * 시트 구조 (첫 실행 시 자동 생성):
 * timestamp | email | plan | job | services | reason
 */

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // 헤더가 없으면 첫 행에 추가
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['timestamp', 'email', 'job', 'age', 'services', 'reason']);
  }

  try {
    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      data.email   || '',
      data.job     || '',
      data.age     || '',
      data.services || '',
      data.reason  || '',
    ]);
  } catch (_) {
    // 파싱 실패 시 raw body 기록
    sheet.appendRow([new Date(), e.postData.contents, '', '', '', '']);
  }

  return ContentService.createTextOutput('ok');
}

// 브라우저 직접 접근 시 동작 확인용
function doGet() {
  return ContentService.createTextOutput('IEUM Fake Door — ok');
}
