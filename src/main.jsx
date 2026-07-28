import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const Icon = ({ name, size = 20 }) => {
  const paths = {
    phone: <path d="M21 15.5v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.64-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.1 2.75 2 2 0 0 1 3.1.57h3a2 2 0 0 1 2 1.72c.13 1 .36 1.97.7 2.92a2 2 0 0 1-.45 2.11L7.08 8.6a16 16 0 0 0 6 6l1.28-1.27a2 2 0 0 1 2.11-.45c.94.34 1.92.57 2.91.7A2 2 0 0 1 21 15.5Z" />,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    check: <path d="m5 12 4.2 4L19 6.5" />,
    clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.2 1.9" /></>,
    shield: <><path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z" /><path d="m8.7 12 2.1 2.1 4.5-4.4" /></>,
    money: <><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="12" cy="12" r="2.8" /><path d="M7 9h.01M17 15h.01" /></>,
    car: <><path d="m4 15 2.1-5.5A3 3 0 0 1 9 7.5h6a3 3 0 0 1 2.8 2L20 15v4H4v-4Z" /><path d="M3 19h18M7.5 19v2M16.5 19v2M7 14h.01M17 14h.01" /></>,
    map: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.3" /></>,
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.8-5.4 2.8 1-6.1L3.2 9.4l6.1-.9L12 3Z" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    calc: <><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M7 7h10M7 12h.01M12 12h.01M17 12h.01M7 17h.01M12 17h.01M17 17h.01" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const scenarios = [
  ['Авто в кредите', 'Поможем закрыть кредит и оформить сделку безопасно.', 'Кредит'],
  ['Авто в залоге', 'Подскажем порядок действий и оценим автомобиль.', 'Залог'],
  ['Битое авто', 'Выкупим после ДТП, организуем эвакуатор при необходимости.', 'ДТП'],
  ['Не на ходу', 'Приедем сами — выезд по Екатеринбургу бесплатно.', 'Выезд'],
  ['Старый автомобиль', 'Рассмотрим авто любого года выпуска и состояния.', 'Любой год'],
]

const reviews = [
  ['Алексей В.', 'Toyota Camry · 2015', 'Продал машину в тот же день. Оценщик приехал вовремя, сумму объяснили по пунктам, расчёт сразу после договора.'],
  ['Марина К.', 'Kia Rio · 2018', 'Нужно было срочно закрыть кредит. Менеджер всё спокойно разъяснил и помог с документами.'],
  ['Илья С.', 'Lada Granta · 2013', 'Авто было после ДТП и не на ходу. Забрали эвакуатором, никаких доплат за выезд не попросили.'],
]

const faqs = [
  ['Как быстро вы получите автомобиль?', 'После согласования цены обычно выезжаем в день обращения. Сам осмотр занимает около 30 минут.'],
  ['Какие документы нужны?', 'Паспорт собственника, СТС и ПТС/ЭПТС. Для кредитного или залогового авто список уточнит менеджер до выезда.'],
  ['Есть ли скрытые комиссии?', 'Нет. До выезда объясняем, какие параметры влияют на оценку, а итоговая сумма фиксируется в договоре.'],
  ['Можно продать битый или неисправный автомобиль?', 'Да. Оценим авто после ДТП, с техническими неисправностями или без возможности передвигаться самостоятельно.'],
  ['Почему итоговая сумма может отличаться от предварительной?', 'Предварительная оценка строится по вашим ответам. На итог влияют комплектация, состояние кузова и техники, документы и рыночная ситуация.'],
]

const quizSteps = [
  { title: 'Какая у вас марка и модель?', hint: 'Например: Toyota Camry', field: 'model', placeholder: 'Марка и модель' },
  { title: 'Укажите год выпуска', hint: 'Это влияет на предварительную оценку', field: 'year', placeholder: 'Например: 2018', type: 'number' },
  { title: 'Какой пробег?', hint: 'Можно указать приблизительно', field: 'mileage', placeholder: 'Например: 120 000 км', type: 'text' },
  { title: 'В каком состоянии автомобиль?', hint: 'Выберите наиболее подходящий вариант', field: 'condition', options: ['Отличное', 'Хорошее', 'Есть замечания', 'После ДТП'] },
  { title: 'Есть особенности сделки?', hint: 'Выберите всё, что относится к автомобилю', field: 'features', options: ['Нет особенностей', 'Кредит', 'Залог', 'Не на ходу'] },
  { title: 'Куда отправить расчёт?', hint: 'Свяжемся в течение 15 минут в рабочее время', field: 'contact', final: true },
]

function App() {
  const [quizOpen, setQuizOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const openQuiz = () => { setQuizOpen(true); setStep(0); setSent(false); setMenuOpen(false) }
  const scrollTo = id => { document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }
  const current = quizSteps[step]
  const setAnswer = (field, value) => setAnswers(prev => ({ ...prev, [field]: value }))
  const next = () => step < quizSteps.length - 1 ? setStep(step + 1) : setSent(true)

  return <>
    <header className="header">
      <a className="logo" href="#top" onClick={() => scrollTo('#top')}><span className="logo-mark"><Icon name="car" size={22} /></span><span>Авто <b>в Деньги</b></span></a>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
        <button onClick={() => scrollTo('#how')}>Как работаем</button><button onClick={() => scrollTo('#reviews')}>Отзывы</button><button onClick={() => scrollTo('#faq')}>Вопросы</button><button onClick={() => scrollTo('#contacts')}>Контакты</button>
      </nav>
      <div className="header-contact"><a href="tel:+73432889900">+7 (343) 288-99-00</a><span>Екатеринбург · ежедневно 8:00–22:00</span></div>
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Открыть меню"><Icon name={menuOpen ? 'close' : 'menu'} /></button>
    </header>

    <main id="top">
      <section className="hero section-pad">
        <div className="hero-copy">
          <div className="eyebrow"><span></span> Срочный выкуп авто в Екатеринбурге</div>
          <h1>Продайте автомобиль <em>сегодня</em></h1>
          <p className="hero-lead">Предварительная оценка за 2 минуты. Выезд, оформление и деньги — в день обращения.</p>
          <div className="hero-actions"><button className="btn btn-main" onClick={openQuiz}>Узнать предварительную сумму <Icon name="arrow" /></button><a className="btn btn-ghost" href="tel:+73432889900"><Icon name="phone" /> Позвонить</a></div>
          <div className="hero-points"><span><Icon name="check" /> Без скрытых комиссий</span><span><Icon name="check" /> Бесплатный выезд</span><span><Icon name="check" /> Договор и расчёт сразу</span></div>
        </div>
        <div className="hero-art" aria-label="Иллюстрация автомобиля">
          <div className="paint paint-a"></div><div className="paint paint-b"></div>
          <div className="location-tag"><Icon name="map" size={16} /><span>Работаем по Екатеринбургу</span></div>
          <div className="car-scene"><div className="car-roof"></div><div className="car-body"><i></i><i></i><b></b><b></b></div><div className="car-shadow"></div></div>
          <div className="hero-card"><div className="card-icon"><Icon name="clock" /></div><div><small>Среднее время ответа</small><strong>15 минут</strong></div></div>
        </div>
      </section>

      <section className="trustbar"><div><strong>10+ лет</strong><span>на рынке выкупа</span></div><div><strong>4,9 / 5</strong><span>оценка клиентов</span></div><div><strong>1 500+</strong><span>автомобилей выкуплено</span></div><div><strong>0 ₽</strong><span>за выезд и оценку</span></div></section>

      <section className="section-pad benefit-section"><div className="section-head"><div><p className="kicker">Без лишних ожиданий</p><h2>Всё, чтобы продать авто спокойно</h2></div><p>Собираем данные заранее, чтобы назвать реалистичную сумму и не тратить ваше время на ненужные встречи.</p></div>
        <div className="benefits"><article><div className="line-icon"><Icon name="calc" /></div><h3>Понятная оценка</h3><p>Объясняем, что влияет на цену: состояние, комплектация, документы и рынок.</p></article><article><div className="line-icon"><Icon name="shield" /></div><h3>Безопасная сделка</h3><p>Проверяем документы, оформляем договор и рассчитываемся сразу после оформления.</p></article><article><div className="line-icon"><Icon name="money" /></div><h3>Деньги в день обращения</h3><p>Наличными или переводом — удобный способ расчёта выбираете вы.</p></article></div>
      </section>

      <section className="quiz-banner section-pad"><div><p className="kicker kicker-light">Предварительная оценка</p><h2>Расскажите об авто — <br/>мы подготовим расчёт</h2><p>Шесть коротких вопросов. Точная сумма — после разговора с менеджером или осмотра.</p></div><button className="btn btn-white" onClick={openQuiz}>Пройти квиз <Icon name="arrow" /></button></section>

      <section id="scenarios" className="section-pad scenarios"><div className="section-head"><div><p className="kicker">Любая ситуация</p><h2>Выкупаем автомобили<br/>с особенностями</h2></div><button className="text-link" onClick={openQuiz}>Оценить свой автомобиль <Icon name="arrow" /></button></div><div className="scenario-grid">{scenarios.map(([title, text, label], i) => <article className={'scenario s' + i} key={title}><span>{label}</span><h3>{title}</h3><p>{text}</p><button onClick={openQuiz}>Получить оценку <Icon name="arrow" size={17} /></button></article>)}</div></section>

      <section id="how" className="process section-pad"><div className="process-intro"><p className="kicker kicker-light">Как это работает</p><h2>Простой путь от заявки до денег</h2><p>Без сложного калькулятора и навязчивых обещаний. Сначала понимаем ваш автомобиль, затем согласовываем удобный формат сделки.</p><button className="btn btn-main" onClick={openQuiz}>Начать оценку <Icon name="arrow" /></button></div><div className="steps">{[['01','Расскажите об авто','Пройдите короткий квиз или позвоните нам.'],['02','Получите оценку','Менеджер уточнит детали и назовёт предварительную сумму.'],['03','Встретьтесь с оценщиком','Приедем в удобное место в Екатеринбурге.'],['04','Оформите сделку','Подписываем договор и сразу рассчитываемся.']].map(([n,t,p]) => <article key={n}><b>{n}</b><div><h3>{t}</h3><p>{p}</p></div></article>)}</div></section>

      <section id="reviews" className="section-pad reviews"><div className="section-head"><div><p className="kicker">Опыт клиентов</p><h2>Нас выбирают за ясность<br/>и скорость</h2></div><div className="rating"><span><Icon name="star" size={18} /> 4.9</span><small>на основе отзывов клиентов</small></div></div><div className="review-grid">{reviews.map(([name, car, quote]) => <article key={name}><div className="review-top"><div className="avatar">{name[0]}</div><div><h3>{name}</h3><span>{car}</span></div><div className="stars">★★★★★</div></div><p>«{quote}»</p></article>)}</div><p className="proof-note">Отзывы, реквизиты, фотографии команды и точки осмотра подключаются после передачи фактических материалов компании.</p></section>

      <section id="faq" className="section-pad faq"><div><p className="kicker">Отвечаем честно</p><h2>Частые вопросы</h2><p>Не нашли свой вопрос? Позвоните — подскажем, как лучше оформить сделку именно в вашей ситуации.</p><a className="btn btn-dark" href="tel:+73432889900"><Icon name="phone" /> +7 (343) 288-99-00</a></div><div className="faq-list">{faqs.map(([q,a], i) => <article className={openFaq === i ? 'faq-open' : ''} key={q}><button onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{q}</span><Icon name="plus" /></button>{openFaq === i && <p>{a}</p>}</article>)}</div></section>

      <section id="contacts" className="contacts"><div className="contact-copy"><p className="kicker kicker-light">Связаться с нами</p><h2>Оценим ваш автомобиль уже сегодня</h2><p>Оставьте номер — менеджер перезвонит в течение 15 минут в рабочее время.</p><form onSubmit={e => { e.preventDefault(); setSent(true) }}><label>Ваш телефон<input required type="tel" placeholder="+7 (___) ___-__-__" /></label><button className="btn btn-main" type="submit">Получить звонок <Icon name="arrow" /></button><small>Отправляя форму, вы соглашаетесь на обработку персональных данных.</small></form>{sent && <div className="success">Спасибо! Мы свяжемся с вами в ближайшее время.</div>}</div><div className="map"><div className="map-grid"></div><div className="map-pin"><Icon name="map" /><b>Авто в Деньги</b><span>Екатеринбург</span></div><div className="address"><strong>Екатеринбург</strong><span>Адрес точки осмотра уточняйте у менеджера</span><a href="tel:+73432889900">+7 (343) 288-99-00</a></div></div></section>
    </main>

    <footer><a className="logo" href="#top"><span className="logo-mark"><Icon name="car" size={22} /></span><span>Авто <b>в Деньги</b></span></a><span>© {new Date().getFullYear()} Авто в Деньги</span><a href="#top">Политика обработки данных</a></footer>

    {quizOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Квиз оценки автомобиля"><div className="quiz-modal"><button className="modal-close" onClick={() => setQuizOpen(false)} aria-label="Закрыть"><Icon name="close" /></button>{sent ? <div className="quiz-success"><div className="success-icon"><Icon name="check" size={30} /></div><p className="kicker">Заявка отправлена</p><h2>Спасибо за ответы!</h2><p>Менеджер подготовит предварительную оценку и свяжется с вами в рабочее время.</p><button className="btn btn-main" onClick={() => setQuizOpen(false)}>Вернуться на сайт</button></div> : <><div className="quiz-top"><span>Оценка автомобиля</span><b>{step + 1} / {quizSteps.length}</b></div><div className="progress"><i style={{ width: `${((step + 1) / quizSteps.length) * 100}%` }}></i></div><div className="quiz-question"><p>Шаг {step + 1}</p><h2>{current.title}</h2><span>{current.hint}</span>{current.options ? <div className="option-list">{current.options.map(option => <button className={answers[current.field] === option ? 'selected' : ''} key={option} onClick={() => setAnswer(current.field, option)}>{option}<span className="radio"></span></button>)}</div> : current.final ? <div className="contact-fields"><input placeholder="Ваше имя" value={answers.name || ''} onChange={e => setAnswer('name', e.target.value)} /><input type="tel" placeholder="Телефон +7 (___) ___-__-__" value={answers.phone || ''} onChange={e => setAnswer('phone', e.target.value)} /><select value={answers.method || ''} onChange={e => setAnswer('method', e.target.value)}><option value="">Удобный способ связи</option><option>Звонок</option><option>WhatsApp</option><option>Telegram</option></select><label className="agreement"><input type="checkbox" required /> Я согласен на обработку персональных данных</label></div> : <input type={current.type || 'text'} placeholder={current.placeholder} value={answers[current.field] || ''} onChange={e => setAnswer(current.field, e.target.value)} />}</div><div className="quiz-actions">{step > 0 && <button className="back-btn" onClick={() => setStep(step - 1)}>Назад</button>}<button className="btn btn-main" onClick={next} disabled={!current.final && !answers[current.field]}>{current.final ? 'Получить расчёт' : 'Продолжить'} <Icon name="arrow" /></button></div><small className="quiz-note"><Icon name="shield" size={15} /> Данные нужны только для оценки автомобиля</small></>}</div></div>}
  </>
}

const structuredData = {
  '@context': 'https://schema.org', '@graph': [
    { '@type': 'LocalBusiness', name: 'Авто в Деньги', description: 'Срочный выкуп автомобилей в Екатеринбурге', telephone: '+7 (343) 288-99-00', address: { '@type': 'PostalAddress', addressLocality: 'Екатеринбург', addressCountry: 'RU' }, areaServed: 'Екатеринбург' },
    { '@type': 'FAQPage', mainEntity: faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) }
  ]
}

document.head.insertAdjacentHTML('beforeend', `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`)
createRoot(document.getElementById('root')).render(<App />)
