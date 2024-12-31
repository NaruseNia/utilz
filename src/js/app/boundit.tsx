import { ActionButton, ActionGroup, Flex, Item, Text } from "@adobe/react-spectrum"
import ImageMapRectangle from "@spectrum-icons/workflow/ImageMapRectangle"
import Individual from "@spectrum-icons/workflow/Individual"

export const BoundIt = () => {
  return (
    <div className="h-[90vh]">
      <div>
        <Text>Mask</Text>
        <Flex>
          <ActionGroup>
            <Item key="maskBounds">
              <Text>Bounds</Text>
              <Individual />
            </Item>
            <Item key="maskFit">
              <Text>Fit</Text>
              <ImageMapRectangle />
            </Item>
          </ActionGroup>
        </Flex>
      </div>
    </div>
  )
}
