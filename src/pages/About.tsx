export const About = () => (
  <div style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto' }}>
    <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }} > О проекте</h1>
    <p style={{ lineHeight: 1.6 }}>
      React-приложение с маршрутизацией, загрузкой данных из API 
      и управлением состоянием через Context API.
    </p>
    <ul style={{ marginTop: '1.5rem', paddingLeft: '1.5rem', lineHeight: 1.8 }}>
      <li>React Router v6 для навигации</li>
      <li>Fetch API + обработка ошибок</li>
      <li>Context API + localStorage для избранного</li>
      <li>Кэширование данных для оптимизации</li>
    </ul>
  </div>
);