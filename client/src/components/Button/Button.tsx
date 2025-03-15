

interface ButtonType {
    text: string,
    callback: () => void
}

export default function Button({
    text,
    callback
}: ButtonType) {
  return (
    <button className="button" onClick={callback}>{text}</button>
  )
}
