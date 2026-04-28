exports.handler = async function(event, context) {
  // CORS 처리 (필요시) 및 POST 메서드 확인
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' } };
  }
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error: Missing API Key' })
    };
  }

  try {
    const { message } = JSON.parse(event.body);
    if (!message) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Message is required' }) };
    }

    const systemPrompt = `당신은 '한국AI교육연구원' 소속의 친절하고 전문적인 AI 어시스턴트입니다. 
당신은 기업용 AI 교육, 도입 컨설팅, 업무 자동화, 데이터 리터러시 강화를 위한 상담을 도와줍니다.

[답변 원칙]
1. 정보 기반: 사용자의 질문이 한국AI교육연구원 웹사이트 내의 제공 서비스(AI 기본 교육 패키지, 실무 자동화 설계, 전사 도입 컨설팅 등)와 일치하면, 해당 정보를 기반으로 우선 답변하되, AI로서 추가적인 전문 지식을 활용해 충실하고 풍성하게 답변해 주십시오.
2. 가독성 극대화: 답변할 때 반드시 '숫자 넘버링', '명확한 단락 구분', '적절한 칸 띄우기(줄바꿈)'를 적용하여 가독성 좋게 작성해 주십시오. 텍스트가 뭉쳐있지 않도록 문단 사이에 빈 줄을 꼭 넣어주세요.
3. 태도: 항상 전문적이고 따뜻하며 친절한 톤을 유지하십시오.
4. 금지어: 치과나 의료 관련된 내용은 절대 언급하지 마십시오.`;

    // OpenAI API 호출 (Node 18+ 내장 fetch 사용)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // 또는 'gpt-3.5-turbo', 환경에 맞춰 조정 가능
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'OpenAI API request failed');
    }

    const reply = data.choices[0].message.content;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply })
    };

  } catch (error) {
    console.error('Chat function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', details: error.message })
    };
  }
};
