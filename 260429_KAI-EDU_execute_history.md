# 🛠️ 한국AI교육연구원 (KAI-EDU) 프로젝트 실행 이력서 (Execute History)

**작성 일자**: 2026년 04월 29일
**프로젝트**: 한국AI교육연구원 랜딩페이지 리브랜딩 및 AI 챗봇 연동
**작업 범위**: `index.html`, `manage.html`, `chat.html`, `netlify/functions/chat.js`
**총 커밋 수**: 7건 (Initial commit 포함)

---

## 📌 실행 요약 (Executive Summary)

기존 '피닉스 치과' 자동화 랜딩페이지를 **'한국AI교육연구원'(KAI-EDU)** 의 B2B 기업 AI 교육·컨설팅 랜딩페이지로 전면 리브랜딩하고, OpenAI API 기반 실시간 AI 챗봇을 Netlify Functions(서버리스)로 안전하게 구축 완료. Git 보안 이슈(API Key 노출)도 함께 해결.

---

## 🗂️ 단계별 실행 기록 (Step-by-Step Execution Log)

### ✅ STEP 1. 기초 자산 정비 및 텍스트/이미지 교체
- **커밋**: `5d1ab89 chore: text and image update for kaiedu`
- **실행 내용**:
  - 기존 외부 임시 이미지 링크 제거
  - 로컬 `images/`, `Logos/` 폴더 내 스케치 스타일 자산으로 매핑 교체
  - 핵심 카피 1차 톤앤매너 변경

### ✅ STEP 2. 헤더 / 푸터 / 히어로 섹션 전면 리라이팅
- **커밋**: `23f57c4 chore: 한국AI교육연구원 문맥에 맞게 헤더, 푸터, 히어로 텍스트 및 이미지 교체 완료`
- **실행 내용**:
  - '피닉스 치과', 'Phoenix AI' → '**한국AI교육연구원**' 일괄 치환
  - 치과 도메인 용어 제거 (상담실장 / 데스크 / 환자 / 임플란트 등)
  - B2B 기업 교육 카피로 재작성 (사내 AI 도입 컨설팅, 업무 자동화, 데이터 리터러시 강조)
  - 연락처 업데이트: `010-8081-9678`, `bobossam9678@gmail.com`
  - **사용자 직접 수정 포인트**: '상담실장용 대시보드' → '교육 운영팀용 대시보드' (Nice catch ✨)

### ✅ STEP 3. 결제 UI/UX 개선 (가격 노출 제어)
- **커밋**: `8aeda3d style: 메인 페이지 결제 상품에서 금액 숨김 처리 (결제창에서만 노출)`
- **실행 내용**:
  - 메인 랜딩페이지 패키지 카드의 금액(129,000원 등) 텍스트를 '패키지 선택하기' 등으로 마스킹
  - **Toss Payments** 결제 위젯 팝업 진입 시점에만 금액 명확히 표시
  - 사용자가 가격에 압도되지 않고 자연스럽게 결제 단계로 진입하도록 UX 흐름 재설계

### ✅ STEP 4. OpenAI 챗봇 API 백엔드 구축
- **커밋**: `f0abc6e api 챗봇설정`
- **실행 내용**:
  - **서버리스 백엔드 신규 생성**: `netlify/functions/chat.js`
  - 브라우저 클라이언트에 API Key 노출 방지 → Netlify 환경변수(`OPENAI_API_KEY`)로 분리
  - **System Prompt 설계 원칙 적용**:
    1. 웹사이트 내 서비스 정보(교육 패키지/컨설팅) 우선 답변 + OpenAI 일반 지식 보조
    2. 가독성 강화: 숫자 넘버링 / 단락 구분 / 줄바꿈 필수
    3. 톤 가이드: 친절·전문 / 치과·의료 언급 금지
  - 프론트엔드(`index.html`) ↔ 서버리스 함수 비동기 fetch 통신 구현

### ✅ STEP 5. 챗봇 가독성 개선 및 예상 질문 말풍선 추가
- **커밋**: `e7f8f5f feat: 챗봇 가독성 개선 및 예상 질문 말풍선 추가`
- **실행 내용**:
  - "답변을 생각하고 있습니다..." 로딩 메시지 추가
  - 응답 줄바꿈(`\n` → `<br>`) 자동 변환 렌더링 처리
  - **💡 예상 질문 말풍선(Quick Reply) 3종 배치**:
    - 챗봇 오픈 시 즉시 클릭 가능한 추천 질문 버튼 노출
    - 클릭 시 자동으로 챗봇 답변 트리거

### 🛡️ STEP 6. Git 보안 사고 방어 및 정리
- **상황**: `[ web site 관리 프로젝트 ].txt` 파일 내 API Key가 함께 커밋되어 GitHub Push Protection이 푸시를 차단함.
- **실행 내용**:
  - `git reset --soft origin/main` → 오염된 과거 커밋 기록 일괄 정리
  - API Key 포함 파일을 코드 베이스에서 분리
  - 안전한 수정 코드만 모아 단일 커밋(`e7f8f5f`)으로 Squash 정리
  - GitHub Secret Scanning 통과 → 정상 푸시 / Netlify 배포 정상화

---

## 🔑 핵심 의사결정 기록 (Key Decisions)

| 항목 | 결정 사항 | 사유 |
|------|----------|------|
| API Key 관리 | 브라우저 직접 호출 ❌ → Netlify Functions 경유 ✅ | 보안 (Key 노출 차단) |
| 결제 금액 표시 | 메인 카드에서 숨김, 결제창에서만 노출 | 전환율 / 심리적 진입장벽 완화 |
| 챗봇 도메인 톤 | "치과·의료 절대 금지" 명시 | 리브랜딩 일관성 보장 |
| Git 히스토리 | Reset Soft + Squash로 흑역사 제거 | Secret Scanning 통과 필수 |

---

## 🚀 배포 및 운영 가이드

1. **챗봇 테스트는 반드시 Netlify 라이브 URL에서 진행** (로컬에서는 환경변수 미적용으로 작동 X)
2. `OPENAI_API_KEY` 변경 시 → Netlify Dashboard > Environment Variables 에서만 갱신 (코드 수정 불필요)
3. 추가 추천 질문/패키지 변경 시 → `index.html` 내 quick-reply 버튼 영역과 `chat.js` System Prompt 동기화 필요

---

## 📂 최종 산출물 파일 트리

```
kai-edu/
├── index.html                      # 메인 랜딩 + 챗봇 UI
├── manage.html                     # 교육 운영팀용 대시보드
├── chat.html                       # 챗봇 전용 페이지
├── netlify/
│   └── functions/
│       └── chat.js                 # OpenAI API 프록시 (서버리스)
├── images/                         # 메인 콘텐츠 이미지
├── Logos/                          # 로고/심볼 자산
├── 260429_KAI-EDU_guide_history.md # 가이드 히스토리
└── 260429_KAI-EDU_execute_history.md  # 실행 이력 (본 문서)
```

---

**🎯 결론**: 리브랜딩 + 결제 UX + AI 챗봇 + Git 보안까지, 4대 축의 풀스택 실행 완료. 라이브 배포 후 챗봇 응답 품질 모니터링 단계로 진입하면 됨. 🚀
