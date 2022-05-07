import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const About = () => {
  const { t } = useTranslation("common");
  return (
    <div className="ml-8 mt-5">
      <div>
        <p>
          Powered by {` `}
          <a
            className="underline underline-offset-1 decoration-sky-900/30 decoration-4 hover:decoration-blue-400"
            href="https://docs.github.com/en/rest"
            target="_blank"
          >
            GitHub REST API
          </a>
          <span>
            {` `}& {` `}
          </span>
          <a
            className="underline underline-offset-1 decoration-sky-900/30 decoration-4 hover:decoration-blue-400"
            href="https://magic.link/"
            target="_blank"
          >
            Magic Link
          </a>
        </p>
      </div>
      <div>
        <p>
          Created by {` `}
          <a
            className="underline underline-offset-1 decoration-sky-900/30 decoration-4 hover:decoration-blue-400"
            href="https://github.com/ntubrian"
            target="_blank"
          >
            ntubrian
          </a>
        </p>
      </div>
      <div>
        <p>
          View on {` `}
          <a
            className="underline underline-offset-1 decoration-sky-900/30 decoration-4 hover:decoration-blue-400"
            href="https://github.com/ntubrian/Github_Finder"
            target="_blank"
          >
            GitHub
          </a>
        </p>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default About;
