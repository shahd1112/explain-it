import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

export type Category =
  | 'Programming'
  | 'Networks'
  | 'Security'
  | 'AI';

type Props = {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
};

const categories: {
  name: Category;
  title: string;
  emoji: string;
}[] = [
  {
    name: 'Programming',
    title: 'Programming',
    emoji: '💻',
  },
  {
    name: 'Networks',
    title: 'Networks',
    emoji: '🌐',
  },
  {
    name: 'Security',
    title: 'Cyber Security',
    emoji: '🔐',
  },
  {
    name: 'AI',
    title: 'Artificial Intelligence',
    emoji: '🤖',
  },
];

export default function CategorySelector({
  selectedCategory,
  onSelectCategory,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        اختر المجال
      </Text>

      <View style={styles.grid}>
        {categories.map((category) => {
          const selected =
            selectedCategory === category.name;

          return (
            <Pressable
              key={category.name}
              onPress={() =>
                onSelectCategory(category.name)
              }
              style={[
                styles.category,
                selected && styles.selectedCategory,
              ]}
            >
              <Text style={styles.emoji}>
                {category.emoji}
              </Text>

              <Text
                style={[
                  styles.categoryText,
                  selected && styles.selectedText,
                ]}
              >
                {category.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 430,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
  },

  title: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 15,
    color: '#1E293B',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },

  category: {
    width: '48%',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },

  selectedCategory: {
    backgroundColor: '#7C3AED',
  },

  emoji: {
    fontSize: 25,
    marginBottom: 5,
  },

  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },

  selectedText: {
    color: '#FFFFFF',
  },
});