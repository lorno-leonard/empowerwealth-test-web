import { GetServerSideProps } from 'next'

type Props = {
  color: string
}

const Color: React.FC<Props> = ({ color }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000',
      }}
    >
      <h1>{color}</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context
  const color = params?.color ?? 'green'
  return {
    props: {
      color,
    },
  }
}

export default Color
