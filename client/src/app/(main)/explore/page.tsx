import { userExistsAction } from "@/actions/user";
import FeedSection from "@/features/feed/components/FeedSection"
import { currentUser } from "@clerk/nextjs/server"

const page = async () => {

    const currUser = await currentUser();

    if(!currUser) return;

    const [userData] = await Promise.all([
        userExistsAction(currUser)
    ])

  return (
    <div>
      <FeedSection posts={[]} currentUserId={userData.id} feedSite="explore"/>
    </div>
  )
}

export default page
