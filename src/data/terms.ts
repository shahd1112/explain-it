export type Category =
  | 'Programming'
  | 'Networks'
  | 'Security'
  | 'AI';

export type LearningLevel =
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced';

export type Term = {
  id: string;
  category: Category;
  name: string;
  explanations: Record<LearningLevel, string>;
  example: string;
};

export const terms: Term[] = [
  // PROGRAMMING
  {
    id: 'programming-component',
    category: 'Programming',
    name: 'Component',
    explanations: {
      Beginner:
        'A reusable part of the user interface.',
      Intermediate:
        'A Component is an independent reusable UI block that can receive Props and manage its own logic.',
      Advanced:
        'A Component encapsulates UI behavior and can be composed with other components to build scalable interfaces.',
    },
    example:
      'A Button or ProfileCard can be created once and reused in many screens.',
  },
  {
    id: 'programming-props',
    category: 'Programming',
    name: 'Props',
    explanations: {
      Beginner:
        'Data passed from one Component to another.',
      Intermediate:
        'Props allow a parent Component to send values and functions to a child Component.',
      Advanced:
        'Props provide typed, one-way data flow between components and help create reusable UI APIs.',
    },
    example:
      'A UserCard can receive the user name through Props.',
  },
  {
    id: 'programming-state',
    category: 'Programming',
    name: 'State',
    explanations: {
      Beginner:
        'Data that can change while the application is running.',
      Intermediate:
        'State stores changing Component data and causes the UI to render again when updated.',
      Advanced:
        'State represents mutable UI data whose updates trigger React reconciliation and re-rendering.',
    },
    example:
      'A quiz score can be stored using useState.',
  },
  {
    id: 'programming-hook',
    category: 'Programming',
    name: 'Hook',
    explanations: {
      Beginner:
        'A React function that gives Components useful features.',
      Intermediate:
        'Hooks such as useState and useEffect allow function Components to use state and lifecycle-related behavior.',
      Advanced:
        'Hooks provide composable access to React state, effects, context, and reusable stateful logic.',
    },
    example:
      'useState stores data and useEffect performs an effect after rendering.',
  },
  {
    id: 'programming-jsx',
    category: 'Programming',
    name: 'JSX',
    explanations: {
      Beginner:
        'A syntax used to describe what the interface should display.',
      Intermediate:
        'JSX allows JavaScript or TypeScript code to describe a React component tree.',
      Advanced:
        'JSX is transformed into React element creation calls and supports expressions inside the UI structure.',
    },
    example:
      '<Text>Hello</Text> is JSX in React Native.',
  },

  // NETWORKS
  {
    id: 'networks-ip',
    category: 'Networks',
    name: 'IP Address',
    explanations: {
      Beginner:
        'An address used to identify a device on an IP network.',
      Intermediate:
        'An IP address identifies a network interface and helps packets reach their destination.',
      Advanced:
        'IP addressing provides logical addressing used with routing and subnetting to deliver packets across networks.',
    },
    example:
      '192.168.1.10 is an example of an IPv4 address.',
  },
  {
    id: 'networks-dns',
    category: 'Networks',
    name: 'DNS',
    explanations: {
      Beginner:
        'A system that converts domain names into IP addresses.',
      Intermediate:
        'DNS resolves human-readable domain names to records such as IP addresses.',
      Advanced:
        'DNS is a distributed hierarchical naming system that performs recursive or iterative resolution using DNS records.',
    },
    example:
      'DNS can resolve a website name to the server IP address.',
  },
  {
    id: 'networks-router',
    category: 'Networks',
    name: 'Router',
    explanations: {
      Beginner:
        'A device that connects different networks.',
      Intermediate:
        'A router examines destination IP addresses and forwards packets between networks.',
      Advanced:
        'Routers use routing tables and routing protocols to select paths for packets between IP networks.',
    },
    example:
      'A home router connects the local network to another network such as the Internet.',
  },
  {
    id: 'networks-dhcp',
    category: 'Networks',
    name: 'DHCP',
    explanations: {
      Beginner:
        'A service that automatically gives network settings to devices.',
      Intermediate:
        'DHCP can automatically provide IP address, subnet mask, gateway and DNS information.',
      Advanced:
        'DHCP dynamically leases network configuration using a client-server exchange.',
    },
    example:
      'Your phone may receive its IP configuration from DHCP after joining Wi-Fi.',
  },
  {
    id: 'networks-mac',
    category: 'Networks',
    name: 'MAC Address',
    explanations: {
      Beginner:
        'A link-layer address associated with a network interface.',
      Intermediate:
        'A MAC address is used for local frame delivery on technologies such as Ethernet.',
      Advanced:
        'MAC addressing operates at the data-link layer and is used by switches when forwarding Ethernet frames.',
    },
    example:
      'An Ethernet frame contains source and destination MAC addresses.',
  },

  // SECURITY
  {
    id: 'security-encryption',
    category: 'Security',
    name: 'Encryption',
    explanations: {
      Beginner:
        'A method used to protect data by making it unreadable without the proper key.',
      Intermediate:
        'Encryption transforms plaintext into ciphertext using a cryptographic algorithm and key.',
      Advanced:
        'Encryption provides confidentiality through cryptographic transformations using symmetric or asymmetric techniques.',
    },
    example:
      'Sensitive data can be encrypted before being transmitted.',
  },
  {
    id: 'security-firewall',
    category: 'Security',
    name: 'Firewall',
    explanations: {
      Beginner:
        'A security system that controls network traffic.',
      Intermediate:
        'A firewall allows or blocks network traffic according to security rules.',
      Advanced:
        'Firewalls enforce traffic policies using information such as addresses, ports, protocols and connection state.',
    },
    example:
      'A firewall may block unauthorized incoming connections.',
  },
  {
    id: 'security-authentication',
    category: 'Security',
    name: 'Authentication',
    explanations: {
      Beginner:
        'The process of verifying identity.',
      Intermediate:
        'Authentication checks whether a user or device is who it claims to be.',
      Advanced:
        'Authentication mechanisms verify identity using factors such as knowledge, possession, or biometrics.',
    },
    example:
      'Signing in with a password is a form of authentication.',
  },
  {
    id: 'security-vpn',
    category: 'Security',
    name: 'VPN',
    explanations: {
      Beginner:
        'A technology used to create a protected connection across another network.',
      Intermediate:
        'A VPN creates a secure tunnel that can protect traffic between endpoints.',
      Advanced:
        'VPN technologies use tunneling and cryptographic mechanisms to provide protected communication over untrusted networks.',
    },
    example:
      'A remote employee may connect securely to a company network through a VPN.',
  },
  {
    id: 'security-hash',
    category: 'Security',
    name: 'Hash Function',
    explanations: {
      Beginner:
        'A function that converts data into a fixed-size value.',
      Intermediate:
        'A cryptographic hash produces a fixed-length digest from input data.',
      Advanced:
        'Cryptographic hash functions are designed with properties such as preimage and collision resistance.',
    },
    example:
      'A hash can help detect whether data has been modified.',
  },

  // AI
  {
    id: 'ai-machine-learning',
    category: 'AI',
    name: 'Machine Learning',
    explanations: {
      Beginner:
        'A way for computers to learn patterns from data.',
      Intermediate:
        'Machine learning uses algorithms that learn relationships from data to perform tasks or predictions.',
      Advanced:
        'Machine learning optimizes model parameters from data to generalize to previously unseen inputs.',
    },
    example:
      'A model can learn from previous sensor readings to make predictions.',
  },
  {
    id: 'ai-model',
    category: 'AI',
    name: 'Model',
    explanations: {
      Beginner:
        'A system trained to perform a particular AI task.',
      Intermediate:
        'A model represents patterns learned from training data.',
      Advanced:
        'A trained model applies learned parameters to input features to produce an output or prediction.',
    },
    example:
      'An image model can classify objects in a picture.',
  },
  {
    id: 'ai-dataset',
    category: 'AI',
    name: 'Dataset',
    explanations: {
      Beginner:
        'A collection of data.',
      Intermediate:
        'A dataset contains examples that can be used for training, validation, testing, or analysis.',
      Advanced:
        'Dataset quality, distribution and labeling can significantly affect model training and evaluation.',
    },
    example:
      'A dataset may contain thousands of labeled images.',
  },
  {
    id: 'ai-prediction',
    category: 'AI',
    name: 'Prediction',
    explanations: {
      Beginner:
        'An output produced by a trained model.',
      Intermediate:
        'A prediction is the result generated when input data is passed through a model.',
      Advanced:
        'Inference applies a trained model to new input features to estimate an output.',
    },
    example:
      'A model might predict tomorrow’s temperature using previous readings.',
  },
  {
    id: 'ai-training',
    category: 'AI',
    name: 'Training',
    explanations: {
      Beginner:
        'The process of teaching a model using data.',
      Intermediate:
        'Training adjusts model parameters based on examples and an optimization objective.',
      Advanced:
        'Training iteratively minimizes an objective or loss function to estimate model parameters from data.',
    },
    example:
      'A model may be trained using historical examples before it is used for predictions.',
  },
];