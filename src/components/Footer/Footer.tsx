function Footer() {
  return (
    <div className="h-16 bg-card flex items-center justify-center">
      <p>
        Copyright &copy; {new Date().getFullYear()}{" "}
        <span className="italic font-light tracking-tighter">WYL - Write Your Logs.</span>{" "}
        All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
