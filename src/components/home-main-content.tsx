import { NavLink } from '@/components/ui/nav-link'
import {
  AmazonwebservicesOriginalWordmark,
  AndroidOriginal,
  BashOriginal,
  ChartjsOriginal,
  ChromeOriginal,
  Css3Original,
  D3jsOriginal,
  DbeaverOriginal,
  DebianOriginal,
  DeviconsReactOriginal,
  DjangoPlainWordmark,
  DjangorestOriginal,
  DockerOriginal,
  ElectronOriginal,
  EslintOriginal,
  ExpressOriginal,
  FastapiOriginal,
  FastifyOriginal,
  FlaskOriginal,
  GitOriginal,
  GithubOriginal,
  GithubactionsOriginal,
  GitkrakenOriginal,
  GoOriginal,
  GoogleOriginal,
  GooglecloudOriginal,
  GrpcOriginal,
  Html5Original,
  HypervOriginal,
  JestPlain,
  JsonOriginal,
  JupyterOriginal,
  KalilinuxOriginal,
  LinuxOriginal,
  LinuxmintOriginal,
  LodashOriginal,
  MarkdownOriginal,
  MaterializecssOriginal,
  MaterialuiOriginal,
  MatplotlibOriginal,
  MongodbOriginal,
  MongooseOriginal,
  MsdosOriginal,
  MysqlOriginal,
  NanoOriginal,
  NextjsOriginal,
  NginxOriginal,
  NgrokOriginal,
  NodejsOriginal,
  NpmOriginal,
  NumpyOriginal,
  OauthOriginal,
  OktaOriginal,
  OpenapiOriginal,
  OpencvOriginal,
  OpenglOriginal,
  OpentelemetryOriginal,
  P5jsOriginal,
  PandasOriginal,
  PlaywrightOriginal,
  PlotlyOriginal,
  PnpmOriginal,
  PostcssOriginal,
  PostgresqlOriginal,
  PostmanOriginal,
  PrismaOriginal,
  ProcessingOriginal,
  PuppeteerOriginal,
  PypiOriginal,
  PytestOriginal,
  PythonOriginal,
  QtOriginal,
  ReactOriginal,
  ReactrouterOriginal,
  ReadthedocsOriginal,
  RedisOriginal,
  ReduxOriginal,
  RustOriginal,
  ScikitlearnOriginal,
  SentryOriginal,
  SlackOriginal,
  SqlalchemyOriginal,
  SqliteOriginal,
  SshOriginal,
  StackoverflowOriginal,
  StorybookOriginal,
  StyledcomponentsOriginal,
  SwaggerOriginal,
  TailwindcssOriginal,
  TerraformOriginal,
  ThreejsOriginal,
  TrpcOriginal,
  TwitterOriginal,
  TypescriptOriginal,
  UbuntuOriginal,
  UnixOriginal,
  UwsgiOriginal,
  V8Original,
  VitejsOriginal,
  VitestOriginal,
  VscodeOriginal,
  VscodiumOriginal,
  WasmOriginal,
  WebgpuOriginal,
  WebpackOriginal,
  Windows11Original,
  YamlOriginal,
} from 'devicons-react'
import { NewspaperIcon, NotebookIcon, AppWindowIcon } from 'lucide-react'

const DEVICON_SIZE = 36

const navLinks: {
  href: string
  label: string
  icon: React.ElementType
}[] = [
  { href: '/articles', label: 'articles', icon: NewspaperIcon },
  { href: '/blogs', label: 'blogs', icon: NotebookIcon },
  { href: '/utils', label: 'utils', icon: AppWindowIcon },
] as const

export const HomeMainContent = () => {
  return (
    <main className="flex flex-col items-center gap-8">
      <ul className="text-center">
        <li className="mb-2 text-xl">Welcome!!</li>
        <li>This is flathill404&apos;s personal website.</li>
      </ul>

      {/* my favorites */}
      <div className="text-center">
        <p>I like ...</p>
        <div className="border rounded max-w-md p-4 mx-4">
          <div className="mb-2">
            <h4 className="font-bold">Languages</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              <PythonOriginal size={DEVICON_SIZE} />
              <GoOriginal size={DEVICON_SIZE} />
              <RustOriginal size={DEVICON_SIZE} />
              <TypescriptOriginal size={DEVICON_SIZE} />
              <Html5Original size={DEVICON_SIZE} />
              <Css3Original size={DEVICON_SIZE} />
              <BashOriginal size={DEVICON_SIZE} />
              <WasmOriginal size={DEVICON_SIZE} />
            </div>
          </div>
          <div className="mb-2">
            <h4 className="font-bold">Frontend</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              <ReactOriginal size={DEVICON_SIZE} />
              <NextjsOriginal size={DEVICON_SIZE} />
              <VitejsOriginal size={DEVICON_SIZE} />
              <TailwindcssOriginal size={DEVICON_SIZE} />
              <MaterialuiOriginal size={DEVICON_SIZE} />
              <StyledcomponentsOriginal size={DEVICON_SIZE} />
              <PostcssOriginal size={DEVICON_SIZE} />
              <WebpackOriginal size={DEVICON_SIZE} />
              <D3jsOriginal size={DEVICON_SIZE} />
              <ChartjsOriginal size={DEVICON_SIZE} />
              <P5jsOriginal size={DEVICON_SIZE} />
              <ThreejsOriginal size={DEVICON_SIZE} />
              <ReactrouterOriginal size={DEVICON_SIZE} />
              <ReduxOriginal size={DEVICON_SIZE} />
              <LodashOriginal size={DEVICON_SIZE} />
              <MaterializecssOriginal size={DEVICON_SIZE} />
              <ProcessingOriginal size={DEVICON_SIZE} />
              <WebgpuOriginal size={DEVICON_SIZE} />
              <OpenglOriginal size={DEVICON_SIZE} />
            </div>
          </div>
          <div className="mb-2">
            <h4 className="font-bold">Backend</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              <NodejsOriginal size={DEVICON_SIZE} />
              <ExpressOriginal size={DEVICON_SIZE} />
              <FastifyOriginal size={DEVICON_SIZE} />
              <DjangoPlainWordmark size={DEVICON_SIZE} />
              <DjangorestOriginal size={DEVICON_SIZE} />
              <FastapiOriginal size={DEVICON_SIZE} />
              <FlaskOriginal size={DEVICON_SIZE} />
              <NginxOriginal size={DEVICON_SIZE} />
              <UwsgiOriginal size={DEVICON_SIZE} />
              <GrpcOriginal size={DEVICON_SIZE} />
              <TrpcOriginal size={DEVICON_SIZE} />
            </div>
          </div>
          <div className="mb-2">
            <h4 className="font-bold">Database</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              <PostgresqlOriginal size={DEVICON_SIZE} />
              <MysqlOriginal size={DEVICON_SIZE} />
              <SqliteOriginal size={DEVICON_SIZE} />
              <MongodbOriginal size={DEVICON_SIZE} />
              <RedisOriginal size={DEVICON_SIZE} />
              <PrismaOriginal size={DEVICON_SIZE} />
              <SqlalchemyOriginal size={DEVICON_SIZE} />
              <MongooseOriginal size={DEVICON_SIZE} />
              <DbeaverOriginal size={DEVICON_SIZE} />
            </div>
          </div>
          <div className="mb-2">
            <h4 className="font-bold">Testing</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              <JestPlain size={DEVICON_SIZE} />
              <PytestOriginal size={DEVICON_SIZE} />
              <PlaywrightOriginal size={DEVICON_SIZE} />
              <PuppeteerOriginal size={DEVICON_SIZE} />
              <VitestOriginal size={DEVICON_SIZE} />
              <StorybookOriginal size={DEVICON_SIZE} />
            </div>
          </div>
          <div className="mb-2">
            <h4 className="font-bold">DevOps & Tools</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              <GitOriginal size={DEVICON_SIZE} />
              <GithubOriginal size={DEVICON_SIZE} />
              <GithubactionsOriginal size={DEVICON_SIZE} />
              <DockerOriginal size={DEVICON_SIZE} />
              <TerraformOriginal size={DEVICON_SIZE} />
              <AmazonwebservicesOriginalWordmark size={DEVICON_SIZE} />
              <GooglecloudOriginal size={DEVICON_SIZE} />
              <NpmOriginal size={DEVICON_SIZE} />
              <PnpmOriginal size={DEVICON_SIZE} />
              <EslintOriginal size={DEVICON_SIZE} />
              <PostmanOriginal size={DEVICON_SIZE} />
              <NgrokOriginal size={DEVICON_SIZE} />
              <SentryOriginal size={DEVICON_SIZE} />
              <OpentelemetryOriginal size={DEVICON_SIZE} />
              <SwaggerOriginal size={DEVICON_SIZE} />
              <OpenapiOriginal size={DEVICON_SIZE} />
              <ReadthedocsOriginal size={DEVICON_SIZE} />
              <PypiOriginal size={DEVICON_SIZE} />
            </div>
          </div>
          <div className="mb-2">
            <h4 className="font-bold">OS & Shell</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              <LinuxOriginal size={DEVICON_SIZE} />
              <DebianOriginal size={DEVICON_SIZE} />
              <UbuntuOriginal size={DEVICON_SIZE} />
              <KalilinuxOriginal size={DEVICON_SIZE} />
              <LinuxmintOriginal size={DEVICON_SIZE} />
              <AndroidOriginal size={DEVICON_SIZE} />
              <Windows11Original size={DEVICON_SIZE} />
              <HypervOriginal size={DEVICON_SIZE} />
              <NanoOriginal size={DEVICON_SIZE} />
              <SshOriginal size={DEVICON_SIZE} />
              <UnixOriginal size={DEVICON_SIZE} />
              <MsdosOriginal size={DEVICON_SIZE} />
            </div>
          </div>
          <div className="mb-2">
            <h4 className="font-bold">Data Science</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              <JupyterOriginal size={DEVICON_SIZE} />
              <NumpyOriginal size={DEVICON_SIZE} />
              <PandasOriginal size={DEVICON_SIZE} />
              <MatplotlibOriginal size={DEVICON_SIZE} />
              <ScikitlearnOriginal size={DEVICON_SIZE} />
              <OpencvOriginal size={DEVICON_SIZE} />
              <PlotlyOriginal size={DEVICON_SIZE} />
            </div>
          </div>
          <div className="mb-2">
            <h4 className="font-bold">Others</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              <VscodeOriginal size={DEVICON_SIZE} />
              <VscodiumOriginal size={DEVICON_SIZE} />
              <ChromeOriginal size={DEVICON_SIZE} />
              <ElectronOriginal size={DEVICON_SIZE} />
              <GitkrakenOriginal size={DEVICON_SIZE} />
              <GoogleOriginal size={DEVICON_SIZE} />
              <JsonOriginal size={DEVICON_SIZE} />
              <MarkdownOriginal size={DEVICON_SIZE} />
              <OauthOriginal size={DEVICON_SIZE} />
              <OktaOriginal size={DEVICON_SIZE} />
              <QtOriginal size={DEVICON_SIZE} />
              <SlackOriginal size={DEVICON_SIZE} />
              <StackoverflowOriginal size={DEVICON_SIZE} />
              <TwitterOriginal size={DEVICON_SIZE} />
              <V8Original size={DEVICON_SIZE} />
              <YamlOriginal size={DEVICON_SIZE} />
              <DeviconsReactOriginal size={DEVICON_SIZE} />
            </div>
          </div>
        </div>
      </div>

      {/* page links */}
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-center">
        {navLinks.map((link) => (
          <li key={link.href}>
            <NavLink href={link.href}>
              <link.icon size={24} />
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </main>
  )
}
