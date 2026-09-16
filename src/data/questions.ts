import type {
    Category,
    LearningLevel,
} from './terms';

export type QuestionType =
  | 'multiple-choice'
  | 'true-false';

export type Question = {
  id: string;
  category: Category;
  level: LearningLevel;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export const questions: Question[] = [
  // =========================
  // PROGRAMMING - BEGINNER
  // =========================
  {
    id: 'pb1',
    category: 'Programming',
    level: 'Beginner',
    type: 'multiple-choice',
    question:
      'What is the main purpose of Props in React?',
    options: [
      'Store database records',
      'Pass data between components',
      'Create network requests',
      'Install packages',
    ],
    correctAnswer:
      'Pass data between components',
    explanation:
      'Props are used to pass data from a parent component to a child component.',
  },
  {
    id: 'pb2',
    category: 'Programming',
    level: 'Beginner',
    type: 'true-false',
    question:
      'Updating State can cause a React component to re-render.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation:
      'When state changes, React can re-render the component to update the UI.',
  },
  {
    id: 'pb3',
    category: 'Programming',
    level: 'Beginner',
    type: 'multiple-choice',
    question:
      'Which Hook is commonly used to store changing data inside a component?',
    options: [
      'useState',
      'useRoute',
      'useStyle',
      'useComponent',
    ],
    correctAnswer: 'useState',
    explanation:
      'useState adds state to a function component.',
  },
  {
    id: 'pb4',
    category: 'Programming',
    level: 'Beginner',
    type: 'multiple-choice',
    question:
      'What does JSX allow you to describe?',
    options: [
      'The user interface',
      'Database tables',
      'IP routes',
      'Operating system processes',
    ],
    correctAnswer:
      'The user interface',
    explanation:
      'JSX is used to describe the UI structure of React components.',
  },

  // PROGRAMMING - INTERMEDIATE
  {
    id: 'pi1',
    category: 'Programming',
    level: 'Intermediate',
    type: 'multiple-choice',
    question:
      'What does useEffect with an empty dependency array normally do?',
    options: [
      'Runs after every render',
      'Runs after the initial mount',
      'Never runs',
      'Runs only when a button is pressed',
    ],
    correctAnswer:
      'Runs after the initial mount',
    explanation:
      'An effect with [] normally runs after the component is mounted.',
  },
  {
    id: 'pi2',
    category: 'Programming',
    level: 'Intermediate',
    type: 'true-false',
    question:
      'A Custom Hook can reuse stateful logic between components.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation:
      'Custom Hooks allow reusable React logic to be extracted from components.',
  },
  {
    id: 'pi3',
    category: 'Programming',
    level: 'Intermediate',
    type: 'multiple-choice',
    question:
      'Why is Context API useful?',
    options: [
      'To share data between multiple components without manually passing Props through every level',
      'To create SQL databases',
      'To replace TypeScript',
      'To compile Android applications',
    ],
    correctAnswer:
      'To share data between multiple components without manually passing Props through every level',
    explanation:
      'Context provides shared values to components within its Provider tree.',
  },
  {
    id: 'pi4',
    category: 'Programming',
    level: 'Intermediate',
    type: 'multiple-choice',
    question:
      'What is Component Composition?',
    options: [
      'Building complex interfaces from smaller reusable components',
      'Writing all UI in one component',
      'Deleting Props',
      'Converting TypeScript to SQL',
    ],
    correctAnswer:
      'Building complex interfaces from smaller reusable components',
    explanation:
      'Composition combines smaller components to create larger interfaces.',
  },

  // PROGRAMMING - ADVANCED
  {
    id: 'pa1',
    category: 'Programming',
    level: 'Advanced',
    type: 'multiple-choice',
    question:
      'Why should React state generally not be mutated directly?',
    options: [
      'React relies on state updates to detect changes and schedule rendering',
      'State only accepts strings',
      'Mutation automatically deletes the component',
      'TypeScript does not support objects',
    ],
    correctAnswer:
      'React relies on state updates to detect changes and schedule rendering',
    explanation:
      'Using state setters creates predictable updates and allows React to process the new state.',
  },
  {
    id: 'pa2',
    category: 'Programming',
    level: 'Advanced',
    type: 'true-false',
    question:
      'A useEffect cleanup function can be used to remove subscriptions or timers.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation:
      'Cleanup helps prevent stale subscriptions, timers, and resource leaks.',
  },
  {
    id: 'pa3',
    category: 'Programming',
    level: 'Advanced',
    type: 'multiple-choice',
    question:
      'What is a major benefit of TypeScript Props definitions?',
    options: [
      'Compile-time checking of component inputs',
      'Automatic database creation',
      'Automatic API hosting',
      'Replacing React Native',
    ],
    correctAnswer:
      'Compile-time checking of component inputs',
    explanation:
      'TypeScript can detect invalid or missing Prop values during development.',
  },
  {
    id: 'pa4',
    category: 'Programming',
    level: 'Advanced',
    type: 'multiple-choice',
    question:
      'Why might application logic be moved into a Custom Hook?',
    options: [
      'To separate reusable logic from UI rendering',
      'To make every component global',
      'To remove all state',
      'To replace Expo Router',
    ],
    correctAnswer:
      'To separate reusable logic from UI rendering',
    explanation:
      'Custom Hooks make reusable stateful logic easier to organize and test.',
  },

  // =========================
  // NETWORKS - BEGINNER
  // =========================
  {
    id: 'nb1',
    category: 'Networks',
    level: 'Beginner',
    type: 'multiple-choice',
    question:
      'What is the main purpose of DNS?',
    options: [
      'Resolve domain names',
      'Encrypt files',
      'Assign MAC addresses',
      'Compile programs',
    ],
    correctAnswer:
      'Resolve domain names',
    explanation:
      'DNS resolves names such as website domains to DNS records such as IP addresses.',
  },
  {
    id: 'nb2',
    category: 'Networks',
    level: 'Beginner',
    type: 'multiple-choice',
    question:
      'Which device normally forwards packets between different IP networks?',
    options: [
      'Router',
      'Keyboard',
      'Monitor',
      'Printer',
    ],
    correctAnswer: 'Router',
    explanation:
      'Routers forward packets between different networks.',
  },
  {
    id: 'nb3',
    category: 'Networks',
    level: 'Beginner',
    type: 'true-false',
    question:
      'DHCP can automatically provide IP configuration to a client.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation:
      'DHCP can provide settings such as IP address, subnet mask, gateway and DNS.',
  },
  {
    id: 'nb4',
    category: 'Networks',
    level: 'Beginner',
    type: 'multiple-choice',
    question:
      'Which address is primarily used for local Ethernet frame delivery?',
    options: [
      'MAC address',
      'URL',
      'Email address',
      'Port name',
    ],
    correctAnswer:
      'MAC address',
    explanation:
      'Ethernet frames use source and destination MAC addresses.',
  },

  // NETWORKS - INTERMEDIATE
  {
    id: 'ni1',
    category: 'Networks',
    level: 'Intermediate',
    type: 'multiple-choice',
    question:
      'What information does a router mainly examine when forwarding an IP packet?',
    options: [
      'Destination IP address',
      'Screen resolution',
      'Username',
      'File extension',
    ],
    correctAnswer:
      'Destination IP address',
    explanation:
      'Routers use the destination IP address with routing information to choose where to forward a packet.',
  },
  {
    id: 'ni2',
    category: 'Networks',
    level: 'Intermediate',
    type: 'true-false',
    question:
      'Devices in different IP networks normally require routing to communicate.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation:
      'Communication between different networks generally requires a router or Layer 3 forwarding.',
  },
  {
    id: 'ni3',
    category: 'Networks',
    level: 'Intermediate',
    type: 'multiple-choice',
    question:
      'What is the purpose of a subnet mask?',
    options: [
      'Determine the network and host portions of an IP address',
      'Encrypt packets',
      'Translate domain names',
      'Identify an application process',
    ],
    correctAnswer:
      'Determine the network and host portions of an IP address',
    explanation:
      'The subnet mask or prefix length identifies which bits belong to the network prefix.',
  },
  {
    id: 'ni4',
    category: 'Networks',
    level: 'Intermediate',
    type: 'multiple-choice',
    question:
      'Which protocol maps an IPv4 address to a MAC address on a local network?',
    options: [
      'ARP',
      'HTTP',
      'FTP',
      'SMTP',
    ],
    correctAnswer: 'ARP',
    explanation:
      'ARP resolves an IPv4 address to a link-layer address on the local network.',
  },

  // NETWORKS - ADVANCED
  {
    id: 'na1',
    category: 'Networks',
    level: 'Advanced',
    type: 'multiple-choice',
    question:
      'If a destination is outside the sender’s local subnet, where is the Ethernet frame normally sent first?',
    options: [
      'The default gateway MAC address',
      'The destination server MAC address across the Internet',
      'The DNS server in every case',
      'The DHCP server',
    ],
    correctAnswer:
      'The default gateway MAC address',
    explanation:
      'For a remote IP destination, the local frame is normally addressed to the next-hop gateway.',
  },
  {
    id: 'na2',
    category: 'Networks',
    level: 'Advanced',
    type: 'true-false',
    question:
      'A router normally changes the Layer 2 frame when forwarding a packet onto another link.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation:
      'The router removes the incoming link-layer framing and creates appropriate framing for the outgoing interface.',
  },
  {
    id: 'na3',
    category: 'Networks',
    level: 'Advanced',
    type: 'multiple-choice',
    question:
      'What does longest-prefix matching help a router select?',
    options: [
      'The most specific matching route',
      'The longest Ethernet frame',
      'The strongest Wi-Fi signal',
      'The largest DNS response',
    ],
    correctAnswer:
      'The most specific matching route',
    explanation:
      'Routers prefer the matching route with the longest network prefix.',
  },
  {
    id: 'na4',
    category: 'Networks',
    level: 'Advanced',
    type: 'multiple-choice',
    question:
      'Which field is reduced by a router when forwarding an IPv4 packet?',
    options: [
      'TTL',
      'Destination port always',
      'Source MAC inside the IP header',
      'DNS name',
    ],
    correctAnswer: 'TTL',
    explanation:
      'IPv4 routers decrement the Time To Live value to prevent packets from circulating indefinitely.',
  },

  // =========================
  // SECURITY - BEGINNER
  // =========================
  {
    id: 'sb1',
    category: 'Security',
    level: 'Beginner',
    type: 'multiple-choice',
    question:
      'What security property is primarily provided by encryption?',
    options: [
      'Confidentiality',
      'Screen brightness',
      'Routing',
      'Compression',
    ],
    correctAnswer:
      'Confidentiality',
    explanation:
      'Encryption protects data from being understood by unauthorized parties.',
  },
  {
    id: 'sb2',
    category: 'Security',
    level: 'Beginner',
    type: 'true-false',
    question:
      'Authentication is used to verify identity.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation:
      'Authentication verifies the identity of a user, device, or other entity.',
  },
  {
    id: 'sb3',
    category: 'Security',
    level: 'Beginner',
    type: 'multiple-choice',
    question:
      'What is a firewall mainly used for?',
    options: [
      'Control network traffic according to security rules',
      'Increase monitor resolution',
      'Compile TypeScript',
      'Store keyboard input',
    ],
    correctAnswer:
      'Control network traffic according to security rules',
    explanation:
      'Firewalls permit or block traffic based on configured security policies.',
  },
  {
    id: 'sb4',
    category: 'Security',
    level: 'Beginner',
    type: 'multiple-choice',
    question:
      'Which technique transforms plaintext into ciphertext?',
    options: [
      'Encryption',
      'Routing',
      'Caching',
      'Rendering',
    ],
    correctAnswer: 'Encryption',
    explanation:
      'Encryption transforms readable plaintext into protected ciphertext.',
  },

  // SECURITY - INTERMEDIATE
  {
    id: 'si1',
    category: 'Security',
    level: 'Intermediate',
    type: 'multiple-choice',
    question:
      'What is the purpose of a cryptographic hash in integrity checking?',
    options: [
      'Help detect changes to data',
      'Recover the original password directly',
      'Assign an IP address',
      'Route packets',
    ],
    correctAnswer:
      'Help detect changes to data',
    explanation:
      'Comparing expected and computed digests can help identify modified data.',
  },
  {
    id: 'si2',
    category: 'Security',
    level: 'Intermediate',
    type: 'true-false',
    question:
      'Encryption and hashing are the same operation and are always reversible.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation:
      'Encryption is designed to be reversible with the appropriate key, while cryptographic hashing is designed as a one-way transformation.',
  },
  {
    id: 'si3',
    category: 'Security',
    level: 'Intermediate',
    type: 'multiple-choice',
    question:
      'What does multi-factor authentication require?',
    options: [
      'Evidence from more than one authentication factor',
      'Two usernames',
      'Two email addresses',
      'Two routers',
    ],
    correctAnswer:
      'Evidence from more than one authentication factor',
    explanation:
      'MFA combines different factor categories such as something you know and something you have.',
  },
  {
    id: 'si4',
    category: 'Security',
    level: 'Intermediate',
    type: 'multiple-choice',
    question:
      'What is a common purpose of a VPN?',
    options: [
      'Protect communication through a tunnel across another network',
      'Replace all passwords',
      'Create React components',
      'Assign domain names',
    ],
    correctAnswer:
      'Protect communication through a tunnel across another network',
    explanation:
      'VPNs use tunneling and security mechanisms to protect communication between endpoints.',
  },

  // SECURITY - ADVANCED
  {
    id: 'sa1',
    category: 'Security',
    level: 'Advanced',
    type: 'multiple-choice',
    question:
      'Which property means an attacker should have difficulty finding two different inputs with the same cryptographic hash?',
    options: [
      'Collision resistance',
      'Routing convergence',
      'Availability',
      'Compression',
    ],
    correctAnswer:
      'Collision resistance',
    explanation:
      'Collision resistance makes finding two different inputs with the same digest computationally difficult.',
  },
  {
    id: 'sa2',
    category: 'Security',
    level: 'Advanced',
    type: 'true-false',
    question:
      'Confidentiality alone guarantees that data was not modified.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation:
      'Confidentiality protects secrecy; integrity mechanisms are needed to detect unauthorized modification.',
  },
  {
    id: 'sa3',
    category: 'Security',
    level: 'Advanced',
    type: 'multiple-choice',
    question:
      'Why is password salting useful before hashing stored passwords?',
    options: [
      'It makes identical passwords produce different stored hash inputs',
      'It converts passwords into IP addresses',
      'It removes the need for hashing',
      'It sends passwords through DNS',
    ],
    correctAnswer:
      'It makes identical passwords produce different stored hash inputs',
    explanation:
      'A unique salt helps prevent identical passwords from having identical stored hashes and reduces the effectiveness of precomputed attacks.',
  },
  {
    id: 'sa4',
    category: 'Security',
    level: 'Advanced',
    type: 'multiple-choice',
    question:
      'What security principle gives a user only the permissions necessary for their task?',
    options: [
      'Least privilege',
      'Longest prefix',
      'Component composition',
      'Caching',
    ],
    correctAnswer:
      'Least privilege',
    explanation:
      'Least privilege limits access rights to what is necessary.',
  },

  // =========================
  // AI - BEGINNER
  // =========================
  {
    id: 'ab1',
    category: 'AI',
    level: 'Beginner',
    type: 'multiple-choice',
    question:
      'What is a dataset?',
    options: [
      'A collection of data',
      'A network router',
      'A React Hook',
      'A firewall rule',
    ],
    correctAnswer:
      'A collection of data',
    explanation:
      'Datasets contain examples or observations used for analysis or machine learning.',
  },
  {
    id: 'ab2',
    category: 'AI',
    level: 'Beginner',
    type: 'true-false',
    question:
      'Machine learning can learn patterns from data.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation:
      'Machine learning algorithms use data to learn relationships or patterns.',
  },
  {
    id: 'ab3',
    category: 'AI',
    level: 'Beginner',
    type: 'multiple-choice',
    question:
      'What is a prediction in machine learning?',
    options: [
      'An output generated by a model for input data',
      'A network cable',
      'A database password',
      'A React component',
    ],
    correctAnswer:
      'An output generated by a model for input data',
    explanation:
      'A trained model processes input and generates an estimated output.',
  },
  {
    id: 'ab4',
    category: 'AI',
    level: 'Beginner',
    type: 'multiple-choice',
    question:
      'What happens during model training?',
    options: [
      'The model learns parameters from data',
      'The computer changes its IP address',
      'The firewall is disabled',
      'JSX is converted to SQL',
    ],
    correctAnswer:
      'The model learns parameters from data',
    explanation:
      'Training adjusts model parameters based on data and an optimization objective.',
  },

  // AI - INTERMEDIATE
  {
    id: 'ai1',
    category: 'AI',
    level: 'Intermediate',
    type: 'multiple-choice',
    question:
      'Why is a test dataset used?',
    options: [
      'To evaluate the trained model on data not used for fitting',
      'To increase screen brightness',
      'To create a router',
      'To store React Props',
    ],
    correctAnswer:
      'To evaluate the trained model on data not used for fitting',
    explanation:
      'A separate test set helps evaluate how the trained model performs on unseen examples.',
  },
  {
    id: 'ai2',
    category: 'AI',
    level: 'Intermediate',
    type: 'true-false',
    question:
      'A model that performs very well on training data can still perform poorly on unseen data.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation:
      'This can happen when a model overfits the training data.',
  },
  {
    id: 'ai3',
    category: 'AI',
    level: 'Intermediate',
    type: 'multiple-choice',
    question:
      'What is a feature in machine learning?',
    options: [
      'An input variable used by a model',
      'Always the final prediction',
      'A network firewall',
      'A React screen',
    ],
    correctAnswer:
      'An input variable used by a model',
    explanation:
      'Features are input variables or measurements supplied to the model.',
  },
  {
    id: 'ai4',
    category: 'AI',
    level: 'Intermediate',
    type: 'multiple-choice',
    question:
      'What is overfitting?',
    options: [
      'Learning training data too specifically and generalizing poorly',
      'Having too many routers',
      'Encrypting the dataset',
      'Using TypeScript',
    ],
    correctAnswer:
      'Learning training data too specifically and generalizing poorly',
    explanation:
      'An overfit model captures training-specific patterns that do not generalize well.',
  },

  // AI - ADVANCED
  {
    id: 'aa1',
    category: 'AI',
    level: 'Advanced',
    type: 'multiple-choice',
    question:
      'What is the role of a loss function during training?',
    options: [
      'Measure model error for optimization',
      'Assign IP addresses',
      'Encrypt model files',
      'Render React components',
    ],
    correctAnswer:
      'Measure model error for optimization',
    explanation:
      'The optimization process attempts to reduce an objective or loss representing prediction error.',
  },
  {
    id: 'aa2',
    category: 'AI',
    level: 'Advanced',
    type: 'true-false',
    question:
      'Good performance on training data alone is sufficient evidence that a model generalizes well.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation:
      'Performance should also be evaluated on data that was not used to fit the model.',
  },
  {
    id: 'aa3',
    category: 'AI',
    level: 'Advanced',
    type: 'multiple-choice',
    question:
      'What does inference mean in a trained machine-learning system?',
    options: [
      'Using the trained model to produce outputs for inputs',
      'Deleting the training dataset',
      'Changing the programming language',
      'Creating a firewall rule',
    ],
    correctAnswer:
      'Using the trained model to produce outputs for inputs',
    explanation:
      'Inference is the stage where a trained model is applied to input data.',
  },
  {
    id: 'aa4',
    category: 'AI',
    level: 'Advanced',
    type: 'multiple-choice',
    question:
      'Why is data quality important in machine learning?',
    options: [
      'Poor or unrepresentative data can negatively affect learned behavior and evaluation',
      'It only changes the application color',
      'It automatically increases CPU speed',
      'It replaces the model',
    ],
    correctAnswer:
      'Poor or unrepresentative data can negatively affect learned behavior and evaluation',
    explanation:
      'Models learn from the information and patterns present in their training data.',
  },
];