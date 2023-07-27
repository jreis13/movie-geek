import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import styles from "./index.module.scss";

function Contacts() {
  return (
    <div>
      <p className={styles.contact__text}>
        This webpage was created as an answer to a frontend challenge. <br /> If
        you have any questions or inquiries, please feel free to contact me from
        one of the channels below.
      </p>

      <div className={styles.contact__logo_wrapper}>
        <a
          className={styles.contact__logo}
          target="_blank"
          rel="noreferrer"
          href="mailto:joaofranciscoreis13@outlook.com"
        >
          <EmailIcon />
        </a>
        <a
          className={styles.contact__logo}
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/joao-francisco-reis/"
        >
          <LinkedInIcon />
        </a>
        <a
          className={styles.contact__logo}
          target="_blank"
          rel="noreferrer"
          href="https://github.com/jreis13"
        >
          <GitHubIcon />
        </a>
      </div>
    </div>
  );
}

export default Contacts;
