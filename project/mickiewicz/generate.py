# IMPORTS
from random import choice
import json
import os

# FUNCTION TO GENERATE RANDOM TEXT FROM MAP FILE
def generate_text(file_name, output_length, first_letter_uppercased=True, dot_at_the_end=True):



    file_name = os.path.dirname(os.path.realpath(__file__)) + '/' +file_name
    # LOAD WORDS MAP
    map_file = open(file_name, 'r', encoding='utf-8') # open specified file
    words_map = json.loads( map_file.read() ) # load it as a dictionary
    map_file.close()

    # GENERATE TEXT
    output_string = ''
    word = choice(list(words_map.keys())) # start with random word
    for _ in range(output_length):
        output_string += word + ' ' # add word to the output string
        next_word = max(words_map[word], key=lambda x: words_map[word][x]) # pick word with the highest probability of being next
        words_map[word][next_word] -= 10 # decrease probability of this sequence to avoid loops
        if choice([True, False, False, False, False, False, False, False]): # 12.5% chance to reroll word (more variation)
            next_word = max(words_map[word], key=lambda x: words_map[word][x]) # pick new word
        word = next_word

    # MAKE FIRST LETTER UPPERCASE - (if specified)
    if first_letter_uppercased:
        output_string = output_string[0].upper() + output_string[1:]
    # ADD DOT AT THE END - (if specified)
    if dot_at_the_end:
        output_string += '.'

    # RETURN GENERATED TEXT
    return output_string
