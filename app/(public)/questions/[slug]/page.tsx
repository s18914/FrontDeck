export default async function Question(props: PageProps<'/questions/[slug]'>) {
  const { slug } = await props.params
  return <h1>Question {slug}</h1>
}
