import Container from "@/app/_components/container";
import { SITE_NAME, SOURCE_REPO_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Keep the charts honest with {SITE_NAME}.
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href={`${SOURCE_REPO_URL}/issues/new`}
              className="mx-3 bg-[#00b7f2] border border-[#00b7f2] text-black font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              Submit a chart crime
            </a>
            <a
              href={SOURCE_REPO_URL}
              className="mx-3 font-bold"
            >
              Contribute on GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
