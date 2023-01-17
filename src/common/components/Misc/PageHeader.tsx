import {
  Box, Container, Flex, Heading, HStack, Select
} from "@chakra-ui/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { getNodeKeys } from "../../lib/quorumConfig";
import { QuorumConfig } from "../../types/QuorumConfig";
const MotionContainer = motion(Container);

interface IProps {
  title: string;
  config: QuorumConfig;
  selectNodeHandler: any;
  isLoading?: boolean;
  maxW?: string;
}

export default function PageHeader(props: IProps) {
  const nodeKeys: string[] = getNodeKeys(props.config);

  return (
    <>
      <MotionContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        maxW={props.maxW ? props.maxW : { base: "container.sm", md: "container.xl" }}
      >
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mt={5}
        >
          <Box>
            <Heading as="h1" size="lg" textAlign="center">
              {props.title}
            </Heading>
          </Box>
          <Box alignItems="center">
            <HStack>
              <FontAwesomeIcon icon={faSlidersH as IconProp} fontSize="lg" />
              <Select
                size="lg"
                variant="filled"
                onChange={props.selectNodeHandler}
              >
                {nodeKeys.map((node) => (
                  <option key={node} value={node}>
                    {node}
                  </option>
                ))}
              </Select>
            </HStack>
          </Box>
        </Flex>
      </MotionContainer>
    </>
  );
}
