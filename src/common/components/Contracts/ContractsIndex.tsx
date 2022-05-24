import { useEffect, useState } from "react";
import { QuorumConfig } from "../../types/QuorumConfig";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  chakra,
  FormControl,
  FormLabel,
  Button,
  useToast,
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Input,
  Code,
  VStack,
  Divider,
  Select,
  useColorMode,
  Switch,
  Flex,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faCode,
  faStream,
  faPaperPlane,
  faQuestionCircle,
  faHammer,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import {
  SmartContract,
  defaultSmartContracts,
  CompiledContract,
} from "../../types/Contracts";
import axios from "axios";
import { getDetailsByNodeName, getPrivateKey } from "../../lib/quorumConfig";
import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";
import getConfig from "next/config";
import ContractsDeploy from "./ContractsDeploy";
import ContractsMetaMask from "./ContractsMetaMask";
const { publicRuntimeConfig } = getConfig();

const CodeEditor = dynamic(() => import("@uiw/react-textarea-code-editor"), {
  ssr: false,
  loading: () => <p>Loading interaction component...</p>,
});

const DynamicSelect = dynamic(
  // @ts-ignore
  () => import("chakra-react-select").then((mod) => mod.Select),
  {
    loading: () => <p>Loading Select component...</p>,
    ssr: false,
  }
);

const DynamicContractsInteract = dynamic(() => import("./ContractsInteract"), {
  loading: () => <p>Loading interaction component...</p>,
});

const MotionGrid = motion(SimpleGrid);
const ChakraEditor = chakra(CodeEditor);

interface IProps {
  config: QuorumConfig;
  selectedNode: string;
}

export default function ContractsIndex(props: IProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const contracts: SmartContract[] = defaultSmartContracts;
  const toast = useToast();
  const [code, setCode] = useState(contracts[0].contract);
  //@ts-ignore
  const [compiledContract, setCompiledContract] = useState<CompiledContract>({
    abi: [],
    bytecode: "",
  });
  const [deployedAddress, setDeployedAddress] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  const [selectedContract, setSelectedContract] = useState(contracts[0].name);
  const [logs, setLogs] = useState<string[]>([]);
  const [tesseraKeys, setTesseraKeys] = useState<
    { label: string; value: string }[]
  >([]);
  const [currentTesseraPublicKey, setCurrentTesseraPublicKey] = useState("");
  const [deployParams, setDeployParams] = useState<{
    privateKeyFrom: string;
    privateFor: string[];
  }>({
    privateKeyFrom: "",
    privateFor: [],
  });
  const controller = new AbortController();
  const [buttonLoading, setButtonLoading] = useState({
    Compile: { status: false, isDisabled: false },
  });
  const [selectLoading, setSelectLoading] = useState<boolean>(true);
  const [getSetTessera, setGetSetTessera] = useState<string[]>([]);
  const [privTxState, setPrivTxState] = useState<boolean>(false);
  const [metaMaskAccount, setMetaMaskAccount] = useState("");
  const [myChain, setMyChain] = useState({ chainId: "", chainName: "" });
  const [metaChain, setMetaChain] = useState({ chainId: "", chainName: "" });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-color-mode",
      colorMode === "light" ? "light" : "dark"
    );
  }, [colorMode]);

  // Set accountAddress if is a member
  useEffect(() => {
    const needle = getDetailsByNodeName(props.config, props.selectedNode);
    if (needle.accountAddress !== undefined) {
      setAccountAddress(needle.accountAddress);
      setDeployParams({
        ...deployParams,
        privateKeyFrom: getPrivateKey(props.config, needle.accountAddress)
          .privateKey,
      });
    } else {
      setAccountAddress("");
      setTesseraKeys([]);
      setDeployParams({ ...deployParams, privateKeyFrom: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.config, props.selectedNode]);

  useEffect(() => {
    setSelectLoading(true);
    const needle = getDetailsByNodeName(props.config, props.selectedNode);
    if (needle.privateTxUrl == "") {
      setCurrentTesseraPublicKey("");
      return;
    }
    const fetchData = async () => {
      const returnRes = await axios({
        method: "POST",
        url: `/api/tesseraGetKeys`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ config: props.config }),
        signal: controller.signal,
        baseURL: `${publicRuntimeConfig.QE_BASEPATH}`,
      })
        .then((res) => {
          setCurrentTesseraPublicKey(
            res.data.filter((_: any) => _.label === props.selectedNode)[0][
              "options"
            ][0]["value"]
          );
          setTesseraKeys(res.data);
          setSelectLoading(false);
        })
        .catch((err) => {
          if (err.status === 401) {
            console.error(`${err.status} Unauthorized`);
          }
        });
      return returnRes;
    };
    fetchData();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedNode]);

  const privTx = (e: any) => {
    // set the state of whether we are using private txns or not
    setPrivTxState(e.target.checked);
  };

  const handleContractAddress = (e: any) => {
    setDeployedAddress(e.target.value);
  };

  function closeAll() {
    // you may optionally pass an object of positions to exclusively close
    // keeping other positions opened
    // e.g. `{ positions: ['bottom'] }`
    toast.closeAll();
  }

  const ContractCodeHandler = (e: any) => {
    e.preventDefault();
    if (e.target.value !== "custom") {
      const needle: SmartContract = contracts.filter(
        (_) => _.name === e.target.value
      )[0];
      setCode(needle.contract);
    }
    if (e.target.value === "custom") {
      setCode("");
    }
    const joined = logs.concat("Navigated to: " + e.target.value);
    setLogs(joined);
    setButtonLoading({
      Compile: { status: false, isDisabled: false },
    });
    setSelectedContract(e.target.value);
  };

  const HandleCompile = async (e: any) => {
    e.preventDefault();
    setButtonLoading({
      ...buttonLoading,
      Compile: { status: true, isDisabled: false },
    });

    if (code === "") {
      toast({
        title: "Empty Contract!",
        description: `Please enter a contract into the code editor`,
        status: "error",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
      setButtonLoading({
        ...buttonLoading,
        Compile: { status: false, isDisabled: false },
      });
      return;
    }

    axios({
      method: "POST",
      url: `/api/contractCompile`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ name: selectedContract, content: code }),
      baseURL: `${publicRuntimeConfig.QE_BASEPATH}`,
    })
      .then((response) => {
        if (response.status === 200) {
          //console.log(response.data);
          setCompiledContract({
            abi: response.data.abi,
            bytecode: response.data.bytecode,
            name: response.data.name,
            gasEstimates: response.data.gasEstimates,
          });
          closeAll();
          toast({
            title: "Compiled Contract!",
            description: `The contract was successfully compiled. Please check the compiled code tab for details `,
            status: "success",
            duration: 5000,
            position: "bottom",
            isClosable: true,
          });
          const joined = logs.concat("Compiled contract: " + selectedContract);
          setLogs(joined);
          setButtonLoading({
            ...buttonLoading,
            Compile: { status: false, isDisabled: false },
          });
        } else {
          closeAll();
          toast({
            title: "Contract Compilation Failed",
            description: `Issue encountered compiling contract!`,
            status: "error",
            duration: 5000,
            position: "bottom",
            isClosable: true,
          });
          const joined = logs.concat(
            "Compilation failed on contract: " + selectedContract
          );
          setLogs(joined);
        }
        setButtonLoading({
          Compile: { status: false, isDisabled: false },
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Backend API Error",
          description: `Issue encountered from the back-end!`,
          status: "error",
          duration: 5000,
          position: "bottom",
          isClosable: true,
        });
        const joined = logs.concat(
          "Failed to connect to back-end to compile contract: " +
            selectedContract
        );
        setLogs(joined);
        setButtonLoading({
          Compile: { status: false, isDisabled: false },
        });
      });
  };

  return (
    <>
      <MotionGrid
        columns={2}
        minChildWidth="400px"
        spacing={5}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* code and button  */}
        <Box mt={5}>
          <Select
            mb={8}
            size="sm"
            variant="filled"
            onChange={ContractCodeHandler}
          >
            {contracts.map((c, i) => (
              <option key={i} value={c.name}>
                {c.name}
              </option>
            ))}
            <option key="custom" value="custom">
              Custom Contract
            </option>
          </Select>
          <Box mb={10}>
            <ChakraEditor
              borderRadius="lg"
              borderWidth={2}
              boxShadow="2xl"
              autoFocus
              value={code}
              language="sol"
              placeholder="Start typing here!"
              onChange={(evn) => setCode(evn.target.value)}
              style={{
                fontSize: 16,
                backgroundColor: colorMode === "light" ? "#f5f5f5" : "#2D3748",
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                overflow: "auto",
                height: "550px",
              }}
              readOnly={selectedContract === "custom" ? false : true}
            />
          </Box>
          <Flex
            justifyContent="space-between"
            alignContent="center"
            alignItems="center"
          >
            <Button
              leftIcon={<FontAwesomeIcon icon={faHammer as IconProp} />}
              isLoading={buttonLoading.Compile.status}
              isDisabled={buttonLoading.Compile.isDisabled}
              loadingText="Compiling..."
              type="submit"
              variant="solid"
              colorScheme="yellow"
              onClick={HandleCompile}
              mr={2}
            >
              Compile
            </Button>
            <Box>
              <FormControl>
                <FormLabel display="inline" htmlFor="private-for-enable" mb="0">
                  Enable Private TX
                </FormLabel>
                <Switch
                  id="private-for-enable"
                  size="lg"
                  colorScheme="messenger"
                  onChange={privTx}
                />
              </FormControl>
            </Box>
          </Flex>
        </Box>

        {/* tabs  */}
        <Box>
          <Tabs mt={5} isFitted isLazy variant="enclosed">
            <TabList mb="1em">
              <Tab>
                <FontAwesomeIcon icon={faPaperPlane as IconProp} />
              </Tab>
              <Tab>
                <FontAwesomeIcon icon={faCode as IconProp} />
              </Tab>
              <Tab>
                <FontAwesomeIcon icon={faStream as IconProp} />
              </Tab>
              <Tab>
                <FontAwesomeIcon icon={faQuestionCircle as IconProp} />
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SimpleGrid columns={2} minChildWidth="400px" spacing="40px">
                  <Accordion allowMultiple defaultIndex={[0, 1, 2]}>
                    <AccordionItem>
                      <AccordionButton>
                        <Box
                          color="blue.600"
                          fontWeight="bold"
                          flex="1"
                          textAlign="left"
                        >
                          1. Account to Deploy
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <FormControl>
                          <FormLabel htmlFor="predefined-account">
                            Account
                          </FormLabel>
                          <Input
                            id="predefined-account"
                            variant="filled"
                            placeholder={
                              privTxState
                                ? "Node is not a Member"
                                : "Not Connected"
                            }
                            value={
                              !privTxState ? metaMaskAccount : accountAddress
                            }
                            readOnly
                          />
                          {privTxState ? (
                            <>
                              <FormLabel htmlFor="private-from">
                                PrivateKey From
                              </FormLabel>
                              <Input
                                id="private-from"
                                variant="filled"
                                placeholder="0x"
                                value={deployParams.privateKeyFrom}
                                readOnly
                              />
                              <FormLabel htmlFor="tessera-key">
                                Tessera Public Key
                              </FormLabel>
                              <Input
                                id="predefined-tessera-key"
                                variant="filled"
                                placeholder="Node is not a Member"
                                value={currentTesseraPublicKey}
                                readOnly
                              />
                            </>
                          ) : (
                            <Box mt={3}>
                              <ContractsMetaMask
                                config={props.config}
                                selectedNode={props.selectedNode}
                                privTxState={privTxState}
                                metaMaskAccount={metaMaskAccount}
                                setMetaMaskAccount={setMetaMaskAccount}
                                setMyChain={setMyChain}
                                setMetaChain={setMetaChain}
                              />
                            </Box>
                          )}

                          {privTxState && (
                            <>
                              <FormLabel htmlFor="private-for">
                                Private For
                              </FormLabel>
                              <DynamicSelect
                                //@ts-ignore
                                isLoading={selectLoading}
                                instanceId="private-for-deploy"
                                isMulti
                                options={tesseraKeys}
                                onChange={(e: any) => {
                                  const myList: string[] = [];
                                  e.map((k: any) => myList.push(k.value));
                                  setGetSetTessera(myList);
                                }}
                                placeholder="Select Tessera node recipients..."
                                closeMenuOnSelect={false}
                                selectedOptionStyle="check"
                                hideSelectedOptions={false}
                                menuPortalTarget={
                                  typeof window !== "undefined"
                                    ? document.body
                                    : null
                                }
                                styles={{
                                  menuPortal: (base: any) => ({
                                    ...base,
                                    zIndex: 9999,
                                  }),
                                }}
                              />
                            </>
                          )}
                        </FormControl>
                      </AccordionPanel>
                    </AccordionItem>

                    <ContractsDeploy
                      config={props.config}
                      selectedNode={props.selectedNode}
                      compiledContract={compiledContract}
                      account={accountAddress}
                      privateFor={deployParams.privateFor}
                      privateFrom={currentTesseraPublicKey}
                      fromPrivateKey={deployParams.privateKeyFrom}
                      selectLoading={selectLoading}
                      setDeployedAddress={setDeployedAddress}
                      closeAllToasts={closeAll}
                      reuseToast={toast}
                      logs={logs}
                      setLogs={setLogs}
                      getSetTessera={getSetTessera}
                      privTxState={privTxState}
                      myChain={myChain}
                      metaChain={metaChain}
                    />
                    <DynamicContractsInteract
                      config={props.config}
                      selectedNode={props.selectedNode}
                      compiledContract={compiledContract}
                      contractAddress={deployedAddress}
                      account={accountAddress}
                      privateFor={deployParams.privateFor}
                      privateFrom={currentTesseraPublicKey}
                      fromPrivateKey={deployParams.privateKeyFrom}
                      selectLoading={selectLoading}
                      closeAllToasts={closeAll}
                      reuseToast={toast}
                      handleContractAddress={handleContractAddress}
                      getSetTessera={getSetTessera}
                    />
                  </Accordion>
                </SimpleGrid>
              </TabPanel>
              {/* compiler output */}
              <TabPanel overflow="scroll" h="550px">
                <VStack
                  align="left"
                  divider={<Divider borderColor="gray.200" />}
                  spacing={5}
                >
                  {compiledContract.abi.length && (
                    <pre>{JSON.stringify(compiledContract.abi, null, 2)}</pre>
                  )}
                  {compiledContract.bytecode && (
                    <Code>{compiledContract.bytecode.toString()}</Code>
                  )}
                </VStack>
              </TabPanel>

              {/* logs */}
              <TabPanel overflow="scroll" h="550px">
                <VStack
                  align="left"
                  divider={<Divider borderColor="gray.200" />}
                  spacing={1}
                >
                  {logs.map((log, i) => (
                    <Code key={i}>{log}</Code>
                  ))}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </MotionGrid>
    </>
  );
}
