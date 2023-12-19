import "./MainHeader.css"

export const MainHeader = (props) => {
  return (
    <header className="main-header">
      {props.children}
    </header>
  )
}