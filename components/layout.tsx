import {Header} from './Header'

type TLayoutProps = {
  readonly children: React.ReactNode;
}
export default function Layout({children} : TLayoutProps) {
  return(
    <div>
    <Header/>
    {children}
  </div>
  )
}