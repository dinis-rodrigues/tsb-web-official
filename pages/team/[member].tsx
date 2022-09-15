import ReactFullpage from "@fullpage/react-fullpage";
import { get, ref } from "firebase/database";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { db } from "../../components/Contexts/Firebase";
import FaviconIcons from "../../components/Head/FaviconIcons";
import Navbar from "../../components/Navbar/Navbar";
import TeamMember from "../../components/Team/TeamMember";
import { PublicTeam, PublicUserInfo } from "../../interfaces";

type Props = {
  userInfo: PublicUserInfo;
  userId: string;
};

const Member = ({ userInfo, userId }: Props) => {
  return (
    <div className="App">
      <Head>
        <title>{userInfo.name} - Técnico Solar Boat</title>
        <FaviconIcons />
      </Head>

      <Navbar theme={"white"} />

      <ReactFullpage
        lockAnchors={true}
        autoScrolling={true}
        scrollOverflow
        fitToSection={false}
        navigation={false}
        responsiveWidth={1250}
        verticalCentered
        onLeave={(origin, destination, direction) => {
          // console.log("onLeave", { origin, destination, direction });
        }}
        afterReBuild={() => {
          // console.log("Rebuilted....");
        }}
        render={() => {
          return (
            <ReactFullpage.Wrapper>
              <TeamMember userId={userId} userInfo={userInfo} />
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
};

/**
 * Retrieves static information of the user we are querying. This is necessary in order
 * to use getStaticPaths.
 * @param context
 * @returns user information
 */
export const getStaticProps: GetStaticProps = async (context) => {
  console.log("getStaticProps", context);
  const member = context.params!.member;
  const allUsersSnapshot = await get(ref(db, `/public/officialWebsite/team`));

  console.log("member", member);

  const allUsers: PublicTeam = allUsersSnapshot.val();

  for (const [userId, user] of Object.entries(allUsers)) {
    if (user.info.userName === member) {
      return { props: { userInfo: user.info, userId: userId } };
    }
  }
  return {
    notFound: true,
  };
};

/**
 * Pre-defined static paths for static HTML file generation. We are retrieving all
 * existing user from the database
 * @returns all existing paths
 */
export const getStaticPaths: GetStaticPaths = async () => {
  return await get(ref(db, `/public/officialWebsite/team`)).then((snapshot) => {
    const team: PublicTeam = snapshot.val();
    if (Object.entries(team).length > 0) {
      const paths = Object.entries(team).map(([userId, user]) => {
        if (!user.info.userName) {
          console.warn(
            "Something went wrong, please check. UserName not found in userId:",
            userId
          );
        }
        return {
          params: {
            member: user.info.userName ? user.info.userName : "",
          },
        };
      });
      return { paths, fallback: false };
    }

    console.warn("Could not retrieve users from database");
    return {
      paths: [
        {
          params: {
            member: "/asd",
          },
        },
      ],
      fallback: false,
    };
  });
};

export default Member;
