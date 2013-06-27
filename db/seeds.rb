File.open('db/word_file', 'r') do |f|
  f.each_line { |line| Word.create(body: line.chomp.downcase) }
end
