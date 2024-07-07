import { getComments } from "./lib/server";
import CommentWrapper from "./components/comment-wrapper";
import FormWrapper from "./components/form-wrapper";



export default async function Home() {
  const comments = await getComments();

  return (
    <main >
      <div>
        <CommentWrapper comments={comments} />
        <FormWrapper style initialValue="" />
      </div>
    </main>
  );
}
 