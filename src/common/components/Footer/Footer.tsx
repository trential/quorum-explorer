import {
  Box, ButtonGroup, Container, Divider, IconButton, Link, Stack, Text, VStack
} from "@chakra-ui/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { ConsensysIcon } from "./ConsensysIcon";
const MotionBox = motion(Box);
const MotionContainer = motion(Container);

export default function Footer() {
  return (
    <>
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        mt={20}
      >
        <Divider />
      </MotionBox>
      <MotionContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        as="footer"
        py={{ base: "5", md: "5" }}
        maxW={{ base: "container.sm", md: "container.xl" }}
      >
        <Stack spacing={0}>
          <Stack
            justify="space-between"
            direction={{ base: "column", md: "row" }}
            align="center"
          >
            <ConsensysIcon boxSize="8em" />
            <ButtonGroup variant="ghost">
              <Link isExternal href="mailto: blockchain@cse.iitk.ac.in">
                <IconButton
                  aria-label="Twitter"
                  icon={
                    <FontAwesomeIcon
                      icon={faEnvelope as IconProp}
                      fontSize="1.25rem"
                    />
                  }
                />
              </Link>
              {/* <Link
                isExternal
                href="https://www.youtube.com/channel/UC5BOLjAQM2NMAhN14EKD47A"
              >
                <IconButton
                  aria-label="Youtube"
                  icon={
                    <FontAwesomeIcon
                      icon={faYoutube as IconProp}
                      fontSize="1.25rem"
                    />
                  }
                />
              </Link> */}
              <Link
                isExternal
                href="https://www.linkedin.com/company/national-blockchain-project/"
              >
                <IconButton
                  aria-label="LinkedIn"
                  icon={
                    <FontAwesomeIcon
                      icon={faLinkedin as IconProp}
                      fontSize="1.25rem"
                    />
                  }
                />
              </Link>
            </ButtonGroup>
          </Stack>
          <VStack mt={0}>
            {/* <Box sx={{ display: "inline-flex" }}>
              <strong>Contact Us:&nbsp;</strong>
              <a href="mailto: info@trential.com">&nbsp; info@trential.com&nbsp;</a>
              |
              <a href="tel: +91-9149338300">&nbsp; +91-9149338300</a>

            </Box> */}
            <Text
              align={{ base: "center", md: "left" }}
              fontSize="sm"
              color="subtle"
            >
              &copy; {new Date().getFullYear()} National Blockchain Project. All
              rights reserved.
            </Text>
            <Text
              align={{ base: "center", md: "left", }}
              fontSize="sm"
              color="subtle"
              display="flex"
            >
              Maintained by <a
                style={{ display: "flex", margin: '2.5px 5px' }}
                href="https://www.trential.com/"
                target="_blank"
                rel="noreferrer">
                <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.8147 10.8408C20.1731 10.4818 20.1731 9.89806 19.8147 9.53912L17.264 6.98893C16.905 6.63048 16.3213 6.63048 15.9628 6.98893L15.6322 7.31954C15.3416 7.61015 14.8688 7.61015 14.5782 7.31954L12.9124 5.65384C12.6218 5.36323 12.6218 4.89035 12.9124 4.59974L13.2431 4.26914C13.602 3.91068 13.602 3.32642 13.2431 2.96797L10.6924 0.417278C10.3339 0.0588239 9.75015 0.0588239 9.39122 0.417278L6.8405 2.96797C6.66683 3.14213 6.57115 3.3725 6.57115 3.61855C6.57115 3.8641 6.66683 4.09548 6.8405 4.26914L7.1711 4.59974C7.46171 4.89035 7.46171 5.36323 7.1711 5.65384L5.5054 7.31954C5.21479 7.61015 4.74192 7.61015 4.45131 7.31954L4.1207 6.98893C3.76174 6.63048 3.17799 6.63048 2.81953 6.98893L0.268841 9.53912C-0.0896136 9.89806 -0.0896136 10.4818 0.268841 10.8403L2.81953 13.391C3.17799 13.7494 3.76174 13.7494 4.1207 13.391L6.67139 10.8408C7.02985 10.4818 7.02985 9.89806 6.67139 9.53912L6.34079 9.20851C6.20003 9.06775 6.12257 8.88042 6.12257 8.68149C6.12257 8.48248 6.20003 8.29515 6.34079 8.15439L8.00649 6.48871C8.15176 6.34341 8.34267 6.27101 8.53351 6.27101C8.72443 6.27101 8.91527 6.34341 9.06061 6.48871L9.23321 6.66136C9.37397 6.80261 9.45145 6.98944 9.45145 7.18841V11.3445C9.45145 11.5567 9.36534 11.7642 9.21496 11.9136L6.10637 15.0223C5.64969 15.4789 5.64969 16.2216 6.10637 16.6784L9.21351 19.7855C9.67015 20.2421 10.4129 20.2421 10.8695 19.7855L13.9766 16.6784C14.4334 16.2216 14.4334 15.4789 13.9766 15.0223L10.8695 11.9152C10.7182 11.7638 10.6321 11.5567 10.6321 11.3445V7.18841C10.6321 6.98893 10.7095 6.80211 10.8503 6.66136L11.023 6.48871C11.3136 6.19861 11.7864 6.1981 12.077 6.48871L13.7427 8.15439C14.0334 8.445 14.0334 8.9179 13.7427 9.20851L13.4121 9.53912C13.0537 9.89806 13.0537 10.4818 13.4121 10.8403L15.9628 13.391C16.3213 13.7494 16.905 13.7494 17.264 13.391L19.8147 10.8408Z" fill="#0170E0" />
                </svg>
                &nbsp;
                <svg width="50" height="20" viewBox="0 0 50 16" fill="blue" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.07397 12.0348C3.70442 12.0348 3.37732 11.9823 3.09267 11.8775C2.81305 11.7676 2.5758 11.6153 2.38107 11.4206C2.19129 11.2208 2.04648 10.9811 1.94664 10.7014C1.84671 10.4218 1.79679 10.1096 1.79679 9.76506V5.75002H1.13763C1.01778 5.75002 0.915339 5.71254 0.830453 5.63765C0.745568 5.55773 0.703125 5.44285 0.703125 5.29307V4.38666L1.93908 4.14697L2.39603 2.25179C2.45595 2.01208 2.6258 1.89223 2.90542 1.89223H4.11893V4.16193H6.04404V5.75002H4.11893V9.60773C4.11893 9.7875 4.16137 9.93735 4.24626 10.0572C4.33618 10.1721 4.46351 10.2295 4.62832 10.2295C4.7132 10.2295 4.78312 10.222 4.83809 10.207C4.89801 10.187 4.94793 10.167 4.98786 10.1471C5.03282 10.1222 5.07274 10.1022 5.10771 10.0872C5.14771 10.0672 5.19259 10.0572 5.24259 10.0572C5.31244 10.0572 5.3674 10.0747 5.40732 10.1096C5.45229 10.1396 5.49725 10.1896 5.54221 10.2595L6.24633 11.3606C5.94671 11.5854 5.60961 11.7551 5.23503 11.8699C4.86053 11.9799 4.47351 12.0348 4.07397 12.0348ZM9.21702 5.34552C9.45671 4.92598 9.73137 4.59643 10.041 4.35674C10.3556 4.11697 10.7152 3.99712 11.1197 3.99712C11.4692 3.99712 11.7539 4.07956 11.9737 4.24437L11.8238 5.95223C11.7989 6.06208 11.7564 6.13704 11.6965 6.17697C11.6415 6.21689 11.5641 6.23689 11.4643 6.23689C11.4243 6.23689 11.3719 6.23437 11.3069 6.22941C11.2421 6.22445 11.1746 6.21941 11.1047 6.21445C11.0348 6.20445 10.9624 6.19697 10.8875 6.19193C10.8176 6.18193 10.7526 6.17697 10.6927 6.17697C10.3531 6.17697 10.081 6.26689 9.87618 6.44666C9.67649 6.62643 9.50664 6.87613 9.36687 7.19575V11.9149H7.04465V4.14697H8.42297C8.53786 4.14697 8.63274 4.15697 8.70763 4.17689C8.78755 4.19689 8.85244 4.22933 8.90244 4.2743C8.95732 4.3143 8.99725 4.36918 9.02229 4.43911C9.05221 4.50903 9.07717 4.59391 9.09717 4.69376L9.21702 5.34552ZM17.4651 7.09834C17.4651 6.91353 17.4401 6.73376 17.3901 6.55903C17.3453 6.38422 17.2679 6.22941 17.1579 6.0946C17.0531 5.95475 16.9133 5.84239 16.7385 5.7575C16.5637 5.67262 16.3514 5.63017 16.1018 5.63017C15.6623 5.63017 15.3177 5.7575 15.068 6.01216C14.8183 6.26185 14.6535 6.62391 14.5737 7.09834H17.4651ZM14.5437 8.44666C14.6185 9.0959 14.8159 9.56781 15.1354 9.86246C15.455 10.1521 15.867 10.2969 16.3714 10.2969C16.6411 10.2969 16.8733 10.2644 17.0681 10.1996C17.2628 10.1346 17.4351 10.0622 17.585 9.98231C17.7398 9.90239 17.8796 9.83002 18.0044 9.76506C18.1343 9.70017 18.2691 9.66765 18.4089 9.66765C18.5937 9.66765 18.7335 9.73514 18.8284 9.86994L19.5026 10.7014C19.2629 10.9761 19.0032 11.2008 18.7235 11.3756C18.4488 11.5454 18.1642 11.6802 17.8696 11.7801C17.5799 11.875 17.2878 11.9399 16.9932 11.9748C16.7035 12.0148 16.4263 12.0348 16.1617 12.0348C15.6173 12.0348 15.1055 11.9473 14.6261 11.7726C14.1517 11.5928 13.7347 11.3281 13.3751 10.9786C13.0205 10.629 12.7384 10.1945 12.5286 9.67521C12.3239 9.15582 12.2215 8.55155 12.2215 7.86239C12.2215 7.34307 12.3089 6.85117 12.4837 6.38674C12.6635 5.92231 12.9182 5.51529 13.2478 5.16575C13.5824 4.81613 13.9843 4.53895 14.4538 4.33422C14.9282 4.12949 15.4625 4.02712 16.0568 4.02712C16.5712 4.02712 17.0406 4.10704 17.4651 4.26681C17.8946 4.42659 18.2616 4.6588 18.5663 4.96346C18.8759 5.26811 19.1156 5.64262 19.2853 6.08704C19.4601 6.52651 19.5476 7.0259 19.5476 7.58521C19.5476 7.76002 19.5401 7.90239 19.525 8.01223C19.5101 8.12208 19.4826 8.20949 19.4427 8.27437C19.4027 8.33933 19.3478 8.38429 19.2779 8.40926C19.213 8.43422 19.128 8.44666 19.0232 8.44666H14.5437ZM22.8519 4.9859C23.0018 4.84613 23.1566 4.71628 23.3163 4.59643C23.4762 4.47659 23.646 4.37666 23.8257 4.29681C24.0105 4.21185 24.2077 4.14697 24.4175 4.10201C24.6322 4.05208 24.8644 4.02712 25.1141 4.02712C25.5386 4.02712 25.9131 4.10201 26.2378 4.25185C26.5673 4.39666 26.8445 4.60139 27.0692 4.86605C27.294 5.12575 27.4637 5.43788 27.5786 5.80246C27.6934 6.16201 27.7509 6.55399 27.7509 6.97849V11.9149H25.4288V6.97849C25.4288 6.59895 25.3414 6.3043 25.1666 6.0946C24.9918 5.87987 24.7346 5.77246 24.395 5.77246C24.1403 5.77246 23.9006 5.82743 23.6759 5.93727C23.4562 6.04216 23.2414 6.18697 23.0317 6.3717V11.9149H20.7095V4.14697H22.1478C22.4374 4.14697 22.6272 4.27681 22.7171 4.53651L22.8519 4.9859ZM32.0328 12.0348C31.6633 12.0348 31.3362 11.9823 31.0515 11.8775C30.7719 11.7676 30.5347 11.6153 30.3399 11.4206C30.1502 11.2208 30.0053 10.9811 29.9054 10.7014C29.8056 10.4218 29.7556 10.1096 29.7556 9.76506V5.75002H29.0964C28.9766 5.75002 28.8742 5.71254 28.7893 5.63765C28.7044 5.55773 28.662 5.44285 28.662 5.29307V4.38666L29.8979 4.14697L30.3549 2.25179C30.4148 2.01208 30.5846 1.89223 30.8643 1.89223H32.0778V4.16193H34.0029V5.75002H32.0778V9.60773C32.0778 9.7875 32.1202 9.93735 32.2051 10.0572C32.295 10.1721 32.4224 10.2295 32.5872 10.2295C32.6721 10.2295 32.742 10.222 32.7969 10.207C32.8568 10.187 32.9067 10.167 32.9467 10.1471C32.9917 10.1222 33.0316 10.1022 33.0666 10.0872C33.1065 10.0672 33.1514 10.0572 33.2014 10.0572C33.2713 10.0572 33.3263 10.0747 33.3662 10.1096C33.4111 10.1396 33.4561 10.1896 33.501 10.2595L34.2052 11.3606C33.9055 11.5854 33.5685 11.7551 33.1939 11.8699C32.8194 11.9799 32.4324 12.0348 32.0328 12.0348ZM37.3781 4.14697V11.9149H35.056V4.14697H37.3781ZM37.6178 2.01958C37.6178 2.20435 37.5804 2.37914 37.5054 2.54393C37.4305 2.70374 37.3282 2.84606 37.1983 2.97091C37.0685 3.09076 36.9162 3.18814 36.7414 3.26305C36.5716 3.33296 36.3893 3.36792 36.1946 3.36792C36.0048 3.36792 35.8275 3.33296 35.6627 3.26305C35.4979 3.18814 35.3506 3.09076 35.2208 2.97091C35.0959 2.84606 34.996 2.70374 34.9211 2.54393C34.8512 2.37914 34.8163 2.20435 34.8163 2.01958C34.8163 1.82981 34.8512 1.65252 34.9211 1.48773C34.996 1.32293 35.0959 1.17811 35.2208 1.05327C35.3506 0.928418 35.4979 0.831036 35.6627 0.76112C35.8275 0.691212 36.0048 0.65625 36.1946 0.65625C36.3893 0.65625 36.5716 0.691212 36.7414 0.76112C36.9162 0.831036 37.0685 0.928418 37.1983 1.05327C37.3282 1.17811 37.4305 1.32293 37.5054 1.48773C37.5804 1.65252 37.6178 1.82981 37.6178 2.01958ZM43.0052 8.75384C42.5408 8.77376 42.1588 8.81376 41.8591 8.87368C41.5595 8.93361 41.3223 9.00849 41.1475 9.09842C40.9727 9.18826 40.8504 9.29063 40.7805 9.40552C40.7155 9.52033 40.6831 9.64521 40.6831 9.78002C40.6831 10.0448 40.7555 10.232 40.9003 10.3419C41.0451 10.4467 41.2573 10.4992 41.537 10.4992C41.8366 10.4992 42.0989 10.4467 42.3235 10.3419C42.5482 10.237 42.7755 10.0672 43.0052 9.83246V8.75384ZM38.8253 5.22567C39.2947 4.81117 39.8141 4.50399 40.3834 4.3043C40.9577 4.09949 41.572 3.99712 42.2262 3.99712C42.6956 3.99712 43.1176 4.07452 43.4921 4.22933C43.8717 4.37918 44.1912 4.59139 44.4509 4.86605C44.7156 5.13575 44.9179 5.45788 45.0577 5.83239C45.1975 6.20697 45.2674 6.61643 45.2674 7.06086V11.9149H44.2037C43.984 11.9149 43.8167 11.885 43.7018 11.8251C43.592 11.7651 43.4996 11.6402 43.4246 11.4505L43.2599 11.0235C43.0651 11.1883 42.8779 11.3331 42.6981 11.458C42.5183 11.5828 42.3311 11.6902 42.1363 11.7801C41.9465 11.865 41.7418 11.9274 41.5221 11.9673C41.3073 12.0123 41.0676 12.0348 40.8029 12.0348C40.4483 12.0348 40.1263 11.9899 39.8366 11.8999C39.5469 11.8051 39.2998 11.6677 39.095 11.488C38.8953 11.3082 38.7405 11.086 38.6306 10.8212C38.5207 10.5516 38.4658 10.242 38.4658 9.89239C38.4658 9.61277 38.5357 9.33063 38.6755 9.04597C38.8153 8.75628 39.0576 8.49414 39.4021 8.25941C39.7467 8.01972 40.2111 7.81994 40.7954 7.66017C41.3797 7.50033 42.1163 7.41048 43.0052 7.39048V7.06086C43.0052 6.60643 42.9103 6.27933 42.7205 6.07956C42.5358 5.87483 42.2711 5.77246 41.9266 5.77246C41.6519 5.77246 41.4272 5.80246 41.2524 5.86239C41.0776 5.92231 40.9203 5.98972 40.7805 6.0646C40.6456 6.13949 40.5133 6.20697 40.3834 6.26689C40.2536 6.32681 40.0988 6.35674 39.919 6.35674C39.7592 6.35674 39.6243 6.31681 39.5145 6.23689C39.4047 6.15697 39.3147 6.06208 39.2448 5.95223L38.8253 5.22567ZM49.0739 0.701196V11.9149H46.7518V0.701196H49.0739Z" fill="#000000" />
                </svg>
              </a>
            </Text>
          </VStack>
        </Stack>
      </MotionContainer>
    </>
  );
}
