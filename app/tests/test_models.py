import unittest
#import coveralls
 
class SimpleestCase(unittest.TestCase):
	def test_index(self):
		self.assertEqual(1 + 1, 2)
 
if __name__ == '__main__':
	unittest.main()
