const StyledErrorMessage = (props) => {
  return (
    <div className="text-red-500">
      {props.children}
    </div>
  )
}

export default StyledErrorMessage;