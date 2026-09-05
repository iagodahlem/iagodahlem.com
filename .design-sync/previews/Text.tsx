import React from 'react'
import { Flex, Text } from 'iagodahlem-com'

const Row = ({ children }: { children?: React.ReactNode }) => (
  <Flex flexDirection='column' style={{ gap: '16px' }}>{children}</Flex>
)

export const TypeScale = () => (
  <Row>
    <Text fontSize='9' fontFamily='heading' fontWeight='4'>Display 9 — Arvo</Text>
    <Text fontSize='7' fontFamily='heading' fontWeight='4'>Heading 7 — Arvo</Text>
    <Text fontSize='6'>Subhead 6 — Montserrat</Text>
    <Text fontSize='5'>
      Body 5 is the default reading size — the type scale is in rem against a
      62.5% root, so index 5 lands at 1.6rem.
    </Text>
    <Text fontSize='4' color='gray.300'>
      Caption 4, dropped to gray.300 for secondary copy.
    </Text>
  </Row>
)

export const Weights = () => (
  <Row>
    <Text fontSize='6' fontWeight='1'>Weight 1 — Regular 400</Text>
    <Text fontSize='6' fontWeight='2'>Weight 2 — Medium 500</Text>
    <Text fontSize='6' fontWeight='3'>Weight 3 — Semibold 600</Text>
    <Text fontSize='6' fontWeight='4'>Weight 4 — Bold 700</Text>
  </Row>
)

export const Families = () => (
  <Row>
    <Text fontSize='7' fontFamily='heading' fontWeight='4'>Arvo — fonts.heading</Text>
    <Text fontSize='5' fontFamily='heading'>
      A slab serif, reserved for headings and the Button face.
    </Text>
    <Text fontSize='7' fontFamily='body' fontWeight='4'>Montserrat — fonts.body</Text>
    <Text fontSize='5' fontFamily='body'>
      A geometric sans, used for everything else on the site.
    </Text>
  </Row>
)

export const Tones = () => (
  <Row>
    <Text fontSize='6' color='black'>color=&apos;black&apos; — the default ink</Text>
    <Text fontSize='6' color='gray.100'>color=&apos;gray.100&apos;</Text>
    <Text fontSize='6' color='gray.300'>color=&apos;gray.300&apos; — secondary copy</Text>
    <Text fontSize='6' color='gray.500'>color=&apos;gray.500&apos; — muted</Text>
  </Row>
)

export const Transform = () => (
  <Row>
    <Text fontSize='4' fontWeight='3' textTransform='uppercase' style={{ letterSpacing: '0.08em' }}>
      Uppercase eyebrow
    </Text>
    <Text fontSize='5' as='blockquote' m='0'>
      Pass <Text as='span' fontWeight='4'>as</Text> to change the element while
      keeping the type styles.
    </Text>
  </Row>
)
