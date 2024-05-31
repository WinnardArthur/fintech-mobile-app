import { View, Text } from "react-native";
import React, { useRef } from "react";
// import { ResizeMode, Video } from "expo-av";
import { useAssets, Asset } from "expo-asset";
// import Video, { VideoRef } from "react-native-video";

const IndexPage = () => {
  //   const videoRef = useRef<VideoRef>(null);

  const [assets] = useAssets([require("@/assets/videos/intro.mp4")]);

  console.log({ assets });
    
  return (
    <View>
      <Text className="text-red-500 text-2xl">IndexPage 1</Text>
      {/* <Video
        ref={video}
        source={require("../assets/videos/intro.mp4")}
        resizeMode={ResizeMode.COVER}
        style={{ width: 300, height: 300 }}
        videoStyle={{ width: 300, height: 300 }}
        shouldPlay
        useNativeControls
      /> */}
      {/* <Video
        ref={videoRef}
        source={require("../assets/videos/intro.mp4")}
        style={{ width: 300, height: 300 }}
      /> */}
      <Text>IndexPage 2</Text>
    </View>
  );
};

export default IndexPage;
