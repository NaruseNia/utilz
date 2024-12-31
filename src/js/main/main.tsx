import { ActionButton, Divider, Flex, Footer, Grid, repeat, SpectrumActionButtonProps, Text, Tooltip, TooltipTrigger } from "@adobe/react-spectrum";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAnimate } from "framer-motion";
import { mainToolTips } from "../lib/constant";
import { UtHeader } from "../component/common";

import Camera from "@spectrum-icons/workflow/Camera";
import Code from "@spectrum-icons/workflow/Code";
import ImageMapRectangle from "@spectrum-icons/workflow/ImageMapRectangle";
import JumpToTop from "@spectrum-icons/workflow/JumpToTop";
import Multiple from "@spectrum-icons/workflow/Multiple";
import { evalTS } from "../lib/utils/bolt";

const Main = () => {
  const [hovered, setHovered] = useState("");
  const [scope, animate] = useAnimate();

  const getTooltip = (action: string) => {
    return mainToolTips[action] ? mainToolTips[action] : { title: "", description: "" };
  }

  useEffect(() => {
    animate("span", { opacity: hovered ? 1 : 0 });
  }, [hovered]);

  return (
    <div className="w-screen h-screen">
      <UtHeader />
      <div className="h-screen p-4">
        <div className="flex flex-col h-full gap-4">
          <div className="flex flex-col flex-grow-0 h-full gap-2">
            <div>
              <Text>Apps</Text>
              <Grid columns={repeat("auto-fit", "size-400")} gap="size-100">
                <UtActionButton group="app" action="bound_it" current={setHovered}>
                  <ImageMapRectangle />
                </UtActionButton>
                <UtActionButton group="app" action="expression_editor" current={setHovered}>
                  <Code />
                </UtActionButton>
              </Grid>
            </div>
            <Divider size="S" />
            <div>
              <Text>Actions</Text>
              <Grid columns={repeat("auto-fit", "size-400")} gap="size-100">
                <UtActionButton group="action" action="link_above" current={setHovered}>
                  <JumpToTop />
                </UtActionButton>
                <UtActionButton group="action" action="apply_expression" current={setHovered}>
                  <Code />
                </UtActionButton>
                <UtActionButton group="action" action="create_camera_controller" current={setHovered}>
                  <Camera />
                </UtActionButton>
                <UtActionButton group="action" action="separate_dimensions" current={setHovered} onPress={() => evalTS("separateDimensions")}>
                  <Multiple />
                </UtActionButton>
              </Grid>
            </div>
          </div>
          <Footer>
            <div ref={scope}>
              <Flex direction="column" gap="size-0">
                <span className="text-lg">{getTooltip(hovered).title}</span>
                <span className="text-gray-400">{getTooltip(hovered).description}</span>
              </Flex>
            </div>
          </Footer>
        </div>
      </div>
    </div>
  );
};

type UtActionButtonProps = {
  group: string;
  action: string;
  current?: Dispatch<SetStateAction<string>>;
} & SpectrumActionButtonProps;

const UtActionButton = (props: React.PropsWithChildren<UtActionButtonProps>) => {
  const handleHover = () => {
    if (props.current) {
      props.current(props.action);
    }
  }

  const handleBlur = () => {
    if (props.current) {
      props.current("");
    }
  }

  return (
    <div onMouseEnter={handleHover} onMouseLeave={handleBlur} className="p-0 m-0">
      <TooltipTrigger delay={0}>
        <ActionButton {...props}>
          {props.children}
        </ActionButton>
        <Tooltip>{mainToolTips[props.action]?.title}</Tooltip>
      </TooltipTrigger>
    </div>
  )
}

export default Main;
