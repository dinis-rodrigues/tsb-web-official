import ReactFullpage from "@fullpage/react-fullpage";
import { get, ref } from "firebase/database";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import BottomWaves from "../../components/Animations/BottomWaves";
import GlowingStars from "../../components/Animations/GlowingStars";
import { db } from "../../components/Contexts/Firebase";
import FaviconIcons from "../../components/Head/FaviconIcons";
import Navbar from "../../components/Navbar/Navbar";
import TeamMember from "../../components/Team/TeamMember";
import { PublicTeam, PublicUser, PublicUserInfo } from "../../interfaces";

type Props = {
  userInfo: PublicUserInfo;
  userId: string;
};

const Member = ({ userInfo, userId }: Props) => {
  const router = useRouter();
  const { member } = router.query;
  const [navTheme, setNavTheme] = useState<"white" | "black">("white");

  return (
    <div className="App">
      <Head>
        <title>{userInfo.name}</title>
        <FaviconIcons />
      </Head>

      <Navbar theme={navTheme} />

      <ReactFullpage
        lockAnchors={true}
        autoScrolling={true}
        scrollOverflow
        fitToSection={false}
        navigation={false}
        responsiveWidth={1250}
        verticalCentered
        onLeave={(origin, destination, direction) => {
          console.log("onLeave", { origin, destination, direction });
        }}
        afterReBuild={() => {
          console.log("Rebuilted....");
        }}
        render={({ fullpageApi }) => {
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
    const paths = Object.entries(team).map(([userId, user]) => ({
      params: {
        member: user.info.userName,
      },
    }));
    return { paths, fallback: false };
  });
};

export default Member;
