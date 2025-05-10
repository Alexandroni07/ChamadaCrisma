import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <p>© {new Date().getFullYear()} Paróquia São João - Todos os direitos reservados</p>
    </footer>
  );
};

export default Footer;